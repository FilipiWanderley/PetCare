import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { apiErrorResponse, withApiErrorHandling } from '@/lib/api-utils';
import { ErrorCodes } from '@/lib/errors';

export const dynamic = 'force-dynamic';

export const GET = withApiErrorHandling(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const secretQuery = searchParams.get('secret');
  const secretHeader = request.headers.get('x-admin-secret');
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return apiErrorResponse(ErrorCodes.API_ENDPOINT_DISABLED);
  }

  if (secretHeader !== adminSecret && secretQuery !== adminSecret) {
    return apiErrorResponse(ErrorCodes.API_UNAUTHORIZED);
  }

  const report: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
      // Do not log the actual URL for security
      DATABASE_URL_PROTOCOL: process.env.DATABASE_URL?.split(':')[0],
    },
    connection: {
      status: 'pending',
      error: null,
    },
    tables: {
      products: 0,
      services: 0,
      testimonials: 0,
    },
  };

  try {
    // 1. Test basic connection
    await prisma.$connect();
    (report.connection as Record<string, unknown>).status = 'connected';

    // 2. Test simple query
    await prisma.$queryRaw`SELECT 1`;
    (report.connection as Record<string, unknown>).queryTest = 'passed';

    // 3. Check data
    (report.tables as Record<string, unknown>).products = await prisma.product.count();
    (report.tables as Record<string, unknown>).services = await prisma.service.count();
    (report.tables as Record<string, unknown>).testimonials = await prisma.testimonial.count();
  } catch (error: unknown) {
    (report.connection as Record<string, unknown>).status = 'failed';
    const err = error as Error & { code?: string; meta?: unknown };

    // Only expose full error details in development
    if (process.env.NODE_ENV === 'development') {
      (report.connection as Record<string, unknown>).error = {
        message: err.message,
        code: err.code,
        meta: err.meta,
        name: err.name,
      };
    } else {
      (report.connection as Record<string, unknown>).error = 'Database connection failed';
    }
  } finally {
    await prisma.$disconnect();
  }

  const status = (report.connection as Record<string, unknown>).status === 'failed' ? 500 : 200;

  if (status === 500) {
    return apiErrorResponse(ErrorCodes.API_DIAGNOSE_FAILED, undefined, report);
  }

  return NextResponse.json(report, { status });
});
