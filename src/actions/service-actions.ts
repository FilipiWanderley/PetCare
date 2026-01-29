'use server';

import { prisma } from '@/lib/db';

export async function getServices() {
  try {
    const count = await prisma.service.count();
    if (count === 0) {
      await seedServices();
    }

    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    const unique = dedupeByKey(services, 'title');
    
    return { success: true, data: unique };
  } catch (error) {
    console.error('Get services error:', error);
    return { success: false, error: 'Erro ao buscar serviços' };
  }
}

async function seedServices() {
  const services = [
    {
      title: 'Adestramento',
      description: 'Técnicas modernas para melhorar o comportamento e a obediência do seu pet.',
      image: '/assets/icons/SVG/Adestra.svg',
    },
    {
      title: 'Alimentação',
      description: 'Opções nutritivas e balanceadas para a saúde e vitalidade do seu companheiro.',
      image: '/assets/icons/SVG/Alimen.svg',
    },
    {
      title: 'Saúde',
      description: 'Cuidados veterinários completos para garantir o bem-estar do seu animal.',
      image: '/assets/icons/SVG/Saúde.svg',
    },
    {
      title: 'Adoção',
      description: 'Encontre seu novo melhor amigo e dê um lar cheio de amor para quem precisa.',
      image: '/assets/icons/SVG/adoçao.svg',
    },
    {
      title: 'Cuidados',
      description: 'Banho, tosa e higiene completa com profissionais carinhosos e experientes.',
      image: '/assets/icons/SVG/cuidados.svg',
    },
    {
      title: 'Curiosidades',
      description: 'Dicas incríveis e informações úteis para você entender melhor o mundo pet.',
      image: '/assets/icons/SVG/curiosidades.svg',
    },
  ];

  for (const s of services) {
    const exists = await prisma.service.findFirst({ where: { title: s.title } });
    if (!exists) {
      await prisma.service.create({ data: s });
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
