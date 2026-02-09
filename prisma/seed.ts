import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed Admin User
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

  console.log({ admin });

  // Seed Services - Re-populating with ALL available icons
  await prisma.service.deleteMany({});

  await prisma.service.createMany({
    data: [
      {
        title: 'Adestramento',
        description: 'Técnicas modernas para melhorar o comportamento e a obediência do seu pet.',
        image: '/assets/icons/SVG/Adestra.svg',
      },
      {
        title: 'Alimentação',
        description:
          'Opções nutritivas e balanceadas para a saúde e vitalidade do seu companheiro.',
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
        title: 'Palestras',
        description:
          'Workshops e palestras educativas para todos os tutores sobre saúde e comportamento animal.',
        image: '/assets/icons/SVG/curiosidades.svg',
      },
    ],
  });
  console.log('Services seeded');

  // Seed Products - Using local assets from public/assets/images/Produtos/
  // First, delete existing products to ensure clean slate with new images
  await prisma.product.deleteMany({});

  await prisma.product.createMany({
    data: [
      {
        name: 'Weight Reduction',
        price: 129.9,
        oldPrice: 149.9,
        image: '/assets/images/Produtos/Background1.svg',
        description: 'Nutrição completa e balanceada para seu cão.',
        category: 'Alimentação',
        isSale: true,
        stock: 50,
        metadata: { weight: '15kg', flavor: 'Frango e Arroz' },
      },
      {
        name: 'Aperitivos pro seu Pet',
        price: 189.9,
        image: '/assets/images/Produtos/Background2.svg',
        description: 'O melhor descanso para seu amigo de quatro patas.',
        category: 'Acessórios',
        stock: 20,
        metadata: { size: 'G', color: 'Azul' },
      },
      {
        name: 'Ração Exclusive',
        price: 39.9,
        image: '/assets/images/Produtos/Background3.svg',
        description: 'Ideal para cães que adoram roer.',
        category: 'Brinquedos',
        stock: 100,
      },
      {
        name: 'Ração Brit pro seu Gato',
        price: 89.9,
        oldPrice: 99.9,
        image: '/assets/images/Produtos/Background5.svg',
        description: 'Shampoo, condicionador e escova.',
        category: 'Higiene',
        isSale: true,
        stock: 30,
      },
      {
        name: 'Brinquedo Mordedor Resistente',
        price: 45.0,
        image: '/assets/images/Produtos/Background6.svg',
        description: 'Coleira resistente e confortável.',
        category: 'Acessórios',
        stock: 50,
      },
      {
        name: 'Ração Victor',
        price: 15.9,
        image: '/assets/images/Produtos/Background7.svg',
        description: 'Petiscos saudáveis para recompensar seu pet.',
        category: 'Alimentação',
        stock: 200,
      },
      {
        name: 'Arranhador para Gatos',
        price: 120.0,
        oldPrice: 150.0,
        image: '/assets/images/Produtos/Background8.svg',
        description: 'Diversão garantida para seu felino.',
        category: 'Brinquedos',
        isSale: true,
        stock: 15,
      },
      {
        name: 'Roupinha de Inverno',
        price: 65.0,
        image: '/assets/images/Produtos/Background9.svg',
        description: 'Mantenha seu pet aquecido com estilo.',
        category: 'Vestuário',
        stock: 40,
      },
    ],
  });
  console.log('Products seeded');

  // Seed Testimonials
  await prisma.testimonial.deleteMany({});

  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Pamela Santos',
        role: 'Tutora de Gato',
        image: '/assets/icons/Picture/Picture1.svg',
        feedback:
          'O serviço simplificou o treinamento e me manteve atualizado sobre a saúde do meu amigo peludo. Nunca foi tão fácil proporcionar o melhor para ele. Recomendo a todos os amantes de animais!',
      },
      {
        name: 'Giovanna Lima',
        role: 'Tutora de Cachorro',
        image: '/assets/icons/Picture/Picture2.svg',
        feedback:
          'Desde que comecei a usar os serviços, percebi uma mudança positiva no comportamento do meu pet. As dicas de adestramento são valiosas!',
      },
      {
        name: 'Ricardo Moraes',
        role: 'Tutor de Gato',
        image: '/assets/icons/Picture/Picture3.svg',
        feedback:
          'O atendimento não apenas me lembra das vacinas e consultas, mas também me conectou a uma comunidade incrível de amantes de animais.',
      },
    ],
  });
  console.log('Testimonials seeded');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
