import { logger } from '@/lib/logger';
import { AppError, ErrorCodes, ERROR_CATALOG } from '@/lib/errors';
import { requestContext } from '@/lib/request-context';
import { headers } from 'next/headers';

export { AppError };

/**
 * Standardized error handling wrapper for Server Actions.
 * Catches errors, logs them properly, and returns a safe response to the client.
 */
export async function withErrorHandling<T>(
  actionName: string,
  fn: () => Promise<T>
): Promise<{
  success: boolean;
  data?: T;
  error?: { code: string; message: string; message_key: string };
  status?: number;
}> {
  // Try to extract Request ID from headers (Next.js 15+ headers() is async)
  let requestId: string | undefined;
  try {
    const headersList = await headers();
    requestId = headersList.get('x-request-id') || undefined;
  } catch {
    // Ignore errors if headers() is not available (e.g. during build or static generation)
  }

  // Wrap execution in AsyncLocalStorage
  return requestContext.run({ requestId: requestId || 'unknown' }, async () => {
    try {
      const data = await fn();
      return { success: true, data };
    } catch (error: unknown) {
      // Determine if it's a known operational error or unexpected crash
      const isOperational = error instanceof AppError && error.isOperational;
      const message = error instanceof Error ? error.message : 'Unknown error';
      const code = error instanceof AppError ? error.code : ErrorCodes.INTERNAL_ERROR;
      const status = error instanceof AppError ? error.status : 500;
      const message_key =
        error instanceof AppError
          ? error.message_key
          : ERROR_CATALOG.INTERNAL_ERROR.message_key || 'generic.unknown_error';
      const stack = error instanceof Error ? error.stack : undefined;

      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage =
        isOperational || isDev
          ? message
          : 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

      logger.error(`Action Failed: ${actionName}`, {
        error: message,
        code,
        stack: stack,
        isOperational,
        status, // Log status code as well
      });

      return {
        success: false,
        error: {
          code: code,
          message: errorMessage,
          message_key: message_key,
          ...(isDev && stack ? { stack } : {}),
        },
        status: status,
      };
    }
  });
}
