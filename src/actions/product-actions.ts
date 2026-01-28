'use server';

import { prisma } from '@/lib/db';

export async function getProducts() {
  try {
    const count = await prisma.product.count();
    if (count === 0) {
      await seedProducts();
    }

    const products = await prisma.product.findMany({
      where: {
        category: null, // Only regular products
      },
      orderBy: {
        id: 'asc',
      },
    });
    
    return { success: true, data: products };
  } catch (error) {
    console.error('Get products error:', error);
    return { success: false, error: 'Erro ao buscar produtos' };
  }
}



async function seedProducts() {
  const products = [
    { name: 'Brit Premium Pet Food', price: 120.00, image: '/assets/images/Produtos/Background1.svg' },
    { name: 'Petiscos para gatos exigentes', price: 12.00, image: '/assets/images/Produtos/Background2.svg' },
    { name: 'Nutrição exclusiva para animais de estimação', price: 88.00, image: '/assets/images/Produtos/Background3.svg' },
    { name: 'Miau Mordidas', price: 8.00, image: '/assets/images/Produtos/Background4.svg' },
    { name: 'Ração para gatos Ocean Treats', price: 250.00, image: '/assets/images/Produtos/Background5.svg' },
    { name: 'Brinquedos', price: 36.00, image: '/assets/images/Produtos/Background6.svg' },
    { name: 'Petiscos para Patinhas Exigentes', price: 120.00, image: '/assets/images/Produtos/Background7.svg' },
    { name: 'Ração supernutritiva para cães', price: 17.00, oldPrice: 28.00, isSale: true, image: '/assets/images/Produtos/Background8.svg' }
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
  }
}


