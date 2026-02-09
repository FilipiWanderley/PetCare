'use server';

import { prisma } from '@/lib/db';
import { dedupeByKey } from '@/lib/utils';
import { unstable_cache } from 'next/cache';

const getCachedTestimonials = unstable_cache(
  async () => {
    return await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  },
  ['testimonials-list'],
  { tags: ['testimonials'], revalidate: 3600 }
);

export async function getTestimonials() {
  try {
    console.log('🔍 Fetching testimonials...');

    // REMOVED: Implicit Seeding Side Effect

    const testimonials = await getCachedTestimonials();

    const unique = dedupeByKey(testimonials, 'name');
    console.log(`✅ Found ${unique.length} testimonials`);

    return { success: true, data: unique };
  } catch (error: unknown) {
    console.error('❌ CRITICAL DB ERROR (Testimonials):', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido ao buscar depoimentos';
    return {
      success: false,
      error: errorMessage,
      details: error instanceof Error ? error.stack : String(error),
    };
  }
}
