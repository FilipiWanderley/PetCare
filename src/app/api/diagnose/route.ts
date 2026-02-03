
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== 'petcare-debug') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const report: any = {
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
    report.connection.status = 'connected';
    
    // 2. Test simple query
    await prisma.$queryRaw`SELECT 1`;
    report.connection.queryTest = 'passed';

    // 3. Check data
    report.tables.products = await prisma.product.count();
    report.tables.services = await prisma.service.count();
    report.tables.testimonials = await prisma.testimonial.count();

  } catch (error: any) {
    report.connection.status = 'failed';
    report.connection.error = {
      message: error.message,
      code: error.code,
      meta: error.meta,
      name: error.name,
    };
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(report, { status: report.connection.status === 'failed' ? 500 : 200 });
}
