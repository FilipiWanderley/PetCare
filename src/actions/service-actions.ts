'use server';

import { prisma } from '@/lib/db';
import { dedupeByKey } from '@/lib/utils';
import { unstable_cache } from 'next/cache';
import { logger } from '@/lib/logger';

const getCachedServices = unstable_cache(
  async () => {
    return await prisma.service.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  },
  ['services-list'],
  { tags: ['services'], revalidate: 3600 }
);

export async function getServices() {
  try {
    logger.info('Fetching services...');

    // REMOVED: Implicit Seeding Side Effect
    // Seeding should be done via admin script or build step, not on every read.

    const services = await getCachedServices();

    const unique = dedupeByKey(services, 'title');
    logger.info(`Found ${unique.length} services`);

    return { success: true, data: unique };
  } catch (error: unknown) {
    logger.error('CRITICAL DB ERROR (Services):', { error });
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido ao buscar serviços';
    return {
      success: false,
      error: errorMessage,
      details: error instanceof Error ? error.stack : String(error),
    };
  }
}
