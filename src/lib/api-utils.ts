import { NextResponse, NextRequest } from 'next/server';
import { ERROR_CATALOG, ErrorCode, AppError, ErrorCodes } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { requestContext } from '@/lib/request-context';

/**
 * Creates a standardized API error response.
 * Uses ERROR_CATALOG for status codes and messages.
 *
 * @param code - The error code from ERROR_CATALOG
 * @param overrideMessage - Optional custom message (use sparingly, prefer catalog defaults)
 * @param details - Optional additional details (e.g., validation errors) - will be included in the response
 * @returns NextResponse with correct status and JSON body
 */
export function apiErrorResponse(code: ErrorCode, overrideMessage?: string, details?: unknown) {
  const def = ERROR_CATALOG[code];

  if (!def) {
    // Safety fallback for unknown codes
    if (process.env.NODE_ENV !== 'production') {
      logger.error(`[API] Critical: Undefined error code used: "${code}"`);
    }

    const fallback = ERROR_CATALOG.INTERNAL_ERROR;
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: fallback.message,
          message_key: fallback.message_key,
        },
      },
      { status: fallback.status }
    );
  }

  const message = overrideMessage || def.message;

  return NextResponse.json(
    {
      error: {
        code,
        message,
        message_key: def.message_key,
        ...(details ? { details } : {}),
      },
    },
    { status: def.status }
  );
}

type ApiHandler = (req: NextRequest, params?: unknown) => Promise<NextResponse>;

/**
 * Wrapper for API Route Handlers to ensure consistent error handling and logging.
 * Prevents stack trace leaks in production.
 */
export function withApiErrorHandling(handler: ApiHandler): ApiHandler {
  return async (req: NextRequest, params?: unknown) => {
    // Extract request ID from headers (injected by middleware)
    const requestId = req.headers.get('x-request-id') || 'unknown';

    // Wrap execution in AsyncLocalStorage context for logger access
    return requestContext.run({ requestId }, async () => {
      try {
        return await handler(req, params);
      } catch (error: unknown) {
        const isOperational = error instanceof AppError && error.isOperational;
        const message = error instanceof Error ? error.message : 'Unknown error';
        const code = error instanceof AppError ? error.code : ErrorCodes.INTERNAL_ERROR;
        const status = error instanceof AppError ? error.status : 500;
        const stack = error instanceof Error ? error.stack : undefined;

        // Log the error securely
        logger.error(`API Route Failed: ${req.nextUrl.pathname}`, {
          method: req.method,
          error: message,
          code,
          stack,
          isOperational,
          status,
        });

        // Determine response message
        const isDev = process.env.NODE_ENV === 'development';
        const responseMessage =
          isOperational || isDev ? message : ERROR_CATALOG.INTERNAL_ERROR.message;

        // Construct error response
        const errorResponse = {
          error: {
            code,
            message: responseMessage,
            message_key:
              error instanceof AppError
                ? error.message_key
                : ERROR_CATALOG.INTERNAL_ERROR.message_key,
            ...(isDev && stack ? { stack } : {}),
            ...(isDev && !isOperational ? { originalError: String(error) } : {}),
          },
        };

        return NextResponse.json(errorResponse, { status });
      }
    });
  };
}
