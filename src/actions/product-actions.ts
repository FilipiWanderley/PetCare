'use server';

import { prisma } from '@/lib/db';
import { dedupeByKey } from '@/lib/utils';
import { unstable_cache } from 'next/cache';
import { logger } from '@/lib/logger';

const getCachedProducts = unstable_cache(
  async () => {
    return await prisma.product.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  },
  ['products-list'],
  { tags: ['products'], revalidate: 3600 }
);

export async function getProducts() {
  try {
    logger.info('Fetching products...');

    // REMOVED: Implicit Seeding Side Effect
    // Seeding should be done via admin script or build step, not on every read.

    const products = await getCachedProducts();

    const unique = dedupeByKey(products, 'name');
    logger.info(`Found ${unique.length} products`);

    return { success: true, data: unique };
  } catch (error: unknown) {
    logger.error('CRITICAL DB ERROR (Products):', { error });

    // Return detailed error for diagnosis
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido ao buscar produtos';
    return {
      success: false,
      error: errorMessage,
      details: error instanceof Error ? error.stack : String(error),
    };
  }
}
