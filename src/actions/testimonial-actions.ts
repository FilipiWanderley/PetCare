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
    
    return { success: true, data: testimonials };
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
      role: 'Tutora de cachorro',
      image: '/assets/icons/Picture/Picture2.svg',
      feedback: 'Desde que comecei a usar os serviços, percebi uma mudança positiva no comportamento do meu pet. As dicas de adestramento são valiosas!',
    },
    {
      name: 'Karla Santana',
      role: 'Tutora de gato',
      image: '/assets/icons/Picture/Picture3.svg',
      feedback: 'O atendimento não apenas me lembra das vacinas e consultas, mas também me conectou a uma comunidade incrível de amantes de animais.',
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }
}
