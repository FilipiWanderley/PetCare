'use server';

import { prisma } from '@/lib/db';

export async function getTestimonials() {
  try {
    const count = await prisma.testimonial.count();
    if (count === 0) {
      await seedTestimonials();
    }

    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    const unique = dedupeByKey(testimonials, 'name');
    
    return { success: true, data: unique };
  } catch (error) {
    console.error('Get testimonials error:', error);
    return { success: false, error: 'Erro ao buscar depoimentos' };
  }
}

async function seedTestimonials() {
  const testimonials = [
    {
      name: 'Renato Santos',
      role: 'Tutor de gato',
      image: '/assets/icons/Picture/Picture1.svg',
      feedback: 'O serviço simplificou o treinamento e me manteve atualizado sobre a saúde do meu amigo peludo. Nunca foi tão fácil proporcionar o melhor para ele. Recomendo a todos os amantes de animais!',
    },
    {
      name: 'Giovanna Lima',
      role: 'Tutor de cachorro',
      image: '/assets/icons/Picture/Picture2.svg',
      feedback: 'Desde que comecei a usar os serviços, percebi uma mudança positiva no comportamento do meu pet. As dicas de adestramento são valiosas!',
    },
    {
      name: 'Karla Santana',
      role: 'Tutor de gato',
      image: '/assets/icons/Picture/Picture3.svg',
      feedback: 'O atendimento não apenas me lembra das vacinas e consultas, mas também me conectou a uma comunidade incrível de amantes de animais.',
    },
  ];

  for (const t of testimonials) {
    const exists = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!exists) {
      await prisma.testimonial.create({ data: t });
    } else {
      // Update role if changed (to fix "Tutora" -> "Tutor")
      if (exists.role !== t.role) {
        await prisma.testimonial.update({
          where: { id: exists.id },
          data: { role: t.role },
        });
      }
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
