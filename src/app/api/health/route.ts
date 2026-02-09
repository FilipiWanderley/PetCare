import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';
import { apiErrorResponse, withApiErrorHandling } from '@/lib/api-utils';

export const dynamic = 'force-dynamic';

export const GET = withApiErrorHandling(async (request: Request) => {
  const start = Date.now();

  const healthCheck: Record<string, unknown> = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'UNKNOWN',
    },
  };

  try {
    // Check DB Connection with a lightweight query
    // Use timeout to prevent hanging if DB is unreachable
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 3000)),
    ]);

    (healthCheck.checks as Record<string, unknown>).database = 'UP';
  } catch (error) {
    (healthCheck.checks as Record<string, unknown>).database = 'DOWN';
    healthCheck.status = 'ERROR';

    logger.error('Healthcheck Failed', { error: String(error) });

    // Return 500 with details (but no sensitive data)
    return apiErrorResponse('API_HEALTH_CHECK_FAILED', undefined, healthCheck);
  }

  const duration = Date.now() - start;
  healthCheck.duration = `${duration}ms`;

  return NextResponse.json(healthCheck);
});
