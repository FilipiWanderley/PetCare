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

export async function getNutritionProducts() {
  try {
    // We don't check count here because getProducts handles seeding if count is 0.
    // But if we only fetch nutrition, we might miss seeding if regular products exist but nutrition don't.
    // Let's safe check.
    const count = await prisma.product.count({ where: { category: 'nutrition' } });
    if (count === 0) {
       await seedNutritionProducts();
    }

    const products = await prisma.product.findMany({
      where: {
        category: 'nutrition',
      },
      orderBy: {
        id: 'asc',
      },
    });
    
    return { success: true, data: products };
  } catch (error) {
    console.error('Get nutrition products error:', error);
    return { success: false, error: 'Erro ao buscar produtos de nutrição' };
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

async function seedNutritionProducts() {
  const products = [
    {
      name: 'Drools',
      price: 0, // Placeholder
      image: '/assets/images/Ali1.svg',
      description: 'Ração seca para cães adultos, sabor frango e ovo, 3 kg.',
      category: 'nutrition',
      metadata: {
        weight: '3KG',
        blobColor: 'yellow',
        blobRotation: '0deg',
      },
    },
    {
      name: 'Canine Creek',
      price: 0,
      image: '/assets/images/Ali2.svg',
      description: 'Ração seca para cães adultos, sabor frango e ovo, 3 kg.',
      category: 'nutrition',
      metadata: {
        weight: '4 KG',
        blobColor: 'gray',
        blobRotation: '45deg',
      },
    },
    {
      name: 'Biscrok Biscuits',
      price: 0,
      image: '/assets/images/Ali3.svg',
      description: 'Ração seca para cães adultos, sabor frango e ovo, 3 kg.',
      category: 'nutrition',
      metadata: {
        weight: '',
        blobColor: 'yellow',
        blobRotation: '90deg',
      },
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
  }
}
