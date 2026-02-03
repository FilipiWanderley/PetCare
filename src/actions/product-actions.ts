'use server';

import { prisma } from '@/lib/db';
import { withRetry } from '@/utils/retry';

export async function getProducts() {
  try {
    const products = await withRetry(async () => {
      const count = await prisma.product.count();
      if (count === 0) {
        await seedProducts();
      }

      return await prisma.product.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    });

    const unique = dedupeByKey(products, 'name');
    
    return { success: true, data: unique };
  } catch (error: any) {
    console.error('❌ CRITICAL DB ERROR (Products):', error);
    
    // Return detailed error for diagnosis
    const errorMessage = error.message || 'Erro desconhecido ao buscar produtos';
    return { 
      success: false, 
      error: errorMessage,
      details: JSON.stringify(error, Object.getOwnPropertyNames(error))
    };
  }
}



async function seedProducts() {
  const products = [
    { name: 'Ração Premium Brit', price: 120.00, image: '/assets/images/Produtos/Background1.svg' },
    { name: 'Petiscos para gatos exigentes', price: 12.00, image: '/assets/images/Produtos/Background2.svg' },
    { name: 'Nutrição exclusiva para animais de estimação', price: 88.00, image: '/assets/images/Produtos/Background3.svg' },
    { name: 'Miau Mordidas', price: 8.00, image: '/assets/images/Produtos/Background4.svg' },
    { name: 'Ração para gatos Ocean Treats', price: 250.00, image: '/assets/images/Produtos/Background5.svg' },
    { name: 'Brinquedos', price: 36.00, image: '/assets/images/Produtos/Background6.svg' },
    { name: 'Petiscos para Patinhas Exigentes', price: 120.00, image: '/assets/images/Produtos/Background7.svg' },
    { name: 'Ração supernutritiva para cães', price: 17.00, oldPrice: 28.00, isSale: true, image: '/assets/images/Produtos/Background8.svg' }
  ];

  for (const p of products) {
    // Check by name or maybe image to avoid duplicates if name changed
    const exists = await prisma.product.findFirst({ 
      where: { 
        OR: [
          { name: p.name },
          { image: p.image }
        ]
      } 
    });
    
    if (!exists) {
      await prisma.product.create({ data: p });
    } else if (exists.name === 'Brit Premium Pet Food' && p.name === 'Ração Premium Brit') {
      // Update the specific item if it exists with old name
      await prisma.product.update({
        where: { id: exists.id },
        data: { name: p.name }
      });
    }
  }
}

function dedupeByKey<T extends Record<string, any>>(items: T[], key: keyof T): T[] {
  const map = new Map<string, T>();
  for (const item of items) {
    const k = String(item[key]);
    if (!map.has(k)) map.set(k, item);
  }
  return Array.from(map.values());
}

