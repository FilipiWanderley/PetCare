import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Simple protection to prevent accidental public triggering
  if (secret !== 'petcare-setup') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Seed Admin User
    const email = 'admin@petcare.com';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        role: 'admin',
        password: hashedPassword,
        emailVerified: new Date(),
      },
      create: {
        email,
        name: 'Administrador',
        password: hashedPassword,
        role: 'admin',
        phone: '0000000000',
        emailVerified: new Date(),
      },
    });

    // 2. Seed Services
    let servicesCount = await prisma.service.count();
    let servicesCreated = 0;
    if (servicesCount === 0) {
      await prisma.service.createMany({
        data: [
          {
            title: 'Banho & Tosa',
            description: 'Serviço completo de higiene e estética para seu pet.',
            image: '/services/grooming.jpg',
          },
          {
            title: 'Consulta Veterinária',
            description: 'Atendimento clínico especializado para cães e gatos.',
            image: '/services/vet.jpg',
          },
          {
            title: 'Vacinação',
            description: 'Mantenha a saúde do seu pet em dia com as vacinas essenciais.',
            image: '/services/vaccine.jpg',
          },
        ],
      });
      servicesCreated = 3;
    }

    // 3. Seed Products
    let productsCount = await prisma.product.count();
    let productsCreated = 0;
    if (productsCount === 0) {
      await prisma.product.createMany({
        data: [
          {
            name: 'Ração Premium Natural',
            price: 129.90,
            oldPrice: 149.90,
            image: '/assets/images/Produtos/img.svg',
            description: 'Nutrição completa e balanceada para seu cão.',
            category: 'Alimentação',
            isSale: true,
            stock: 50,
            metadata: { weight: '15kg', flavor: 'Frango e Arroz' },
          },
          {
            name: 'Cama Confortável Nuvem',
            price: 189.90,
            image: '/assets/images/Produtos/compras.svg',
            description: 'O melhor descanso para seu amigo de quatro patas.',
            category: 'Acessórios',
            stock: 20,
            metadata: { size: 'G', color: 'Azul' },
          },
          {
            name: 'Brinquedo Mordedor Resistente',
            price: 39.90,
            image: '/assets/images/Produtos/ani.svg',
            description: 'Ideal para cães que adoram roer.',
            category: 'Brinquedos',
            stock: 100,
          },
          {
            name: 'Kit Higiene Pet',
            price: 89.90,
            oldPrice: 99.90,
            image: '/assets/images/Produtos/img.svg',
            description: 'Shampoo, condicionador e escova.',
            category: 'Higiene',
            isSale: true,
            stock: 30,
          },
        ],
      });
      productsCreated = 4;
    }

    // 4. Seed Testimonials
    let testimonialsCount = await prisma.testimonial.count();
    let testimonialsCreated = 0;
    if (testimonialsCount === 0) {
      await prisma.testimonial.createMany({
        data: [
          {
            name: 'Ana Souza',
            role: 'Tutora do Rex',
            image: '/assets/images/Dog1.svg',
            feedback: 'Simplesmente incrível! O atendimento foi impecável e o Rex voltou super cheiroso.',
          },
          {
            name: 'Carlos Oliveira',
            role: 'Tutor da Luna',
            image: '/assets/images/Dog1.svg',
            feedback: 'A equipe é muito atenciosa e profissional. Confio de olhos fechados!',
          },
          {
            name: 'Mariana Costa',
            role: 'Tutora do Mingau',
            image: '/assets/images/Dog1.svg',
            feedback: 'Melhor clínica veterinária da região. Preço justo e muito carinho com os animais.',
          },
        ],
      });
      testimonialsCreated = 3;
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      details: {
        admin: admin.email,
        servicesCreated,
        productsCreated,
        testimonialsCreated,
      },
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
