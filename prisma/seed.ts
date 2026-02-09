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

  // Seed Products - Re-populating with ALL available images
  // First, delete existing products to ensure clean slate with new images
  await prisma.product.deleteMany({});

  await prisma.product.createMany({
    data: [
      {
        name: 'Ração Premium Natural',
        price: 129.9,
        oldPrice: 149.9,
        image: 'https://loremflickr.com/500/500/dog,food?lock=1',
        description: 'Nutrição completa e balanceada para seu cão.',
        category: 'Alimentação',
        isSale: true,
        stock: 50,
        metadata: { weight: '15kg', flavor: 'Frango e Arroz' },
      },
      {
        name: 'Cama Confortável Nuvem',
        price: 189.9,
        image: 'https://loremflickr.com/500/500/dog,bed?lock=2',
        description: 'O melhor descanso para seu amigo de quatro patas.',
        category: 'Acessórios',
        stock: 20,
        metadata: { size: 'G', color: 'Azul' },
      },
      {
        name: 'Brinquedo Mordedor Resistente',
        price: 39.9,
        image: 'https://loremflickr.com/500/500/dog,toy?lock=3',
        description: 'Ideal para cães que adoram roer.',
        category: 'Brinquedos',
        stock: 100,
      },
      {
        name: 'Kit Higiene Pet',
        price: 89.9,
        oldPrice: 99.9,
        image: 'https://loremflickr.com/500/500/dog,shampoo?lock=4',
        description: 'Shampoo, condicionador e escova.',
        category: 'Higiene',
        isSale: true,
        stock: 30,
      },
      // New products for Background images
      {
        name: 'Coleira Ajustável Colorida',
        price: 45.0,
        image: 'https://loremflickr.com/500/500/dog,collar?lock=5',
        description: 'Coleira resistente e confortável.',
        category: 'Acessórios',
        stock: 50,
      },
      {
        name: 'Biscoitos Naturais',
        price: 15.9,
        image: 'https://loremflickr.com/500/500/dog,treats?lock=6',
        description: 'Petiscos saudáveis para recompensar seu pet.',
        category: 'Alimentação',
        stock: 200,
      },
      {
        name: 'Arranhador para Gatos',
        price: 120.0,
        oldPrice: 150.0,
        image: 'https://loremflickr.com/500/500/cat,scratcher?lock=7',
        description: 'Diversão garantida para seu felino.',
        category: 'Brinquedos',
        isSale: true,
        stock: 15,
      },
      {
        name: 'Roupinha de Inverno',
        price: 65.0,
        image: 'https://loremflickr.com/500/500/dog,clothes?lock=8',
        description: 'Mantenha seu pet aquecido com estilo.',
        category: 'Vestuário',
        stock: 40,
      },
      {
        name: 'Comedouro Automático',
        price: 250.0,
        image: 'https://loremflickr.com/500/500/pet,bowl?lock=9',
        description: 'Praticidade na hora da alimentação.',
        category: 'Acessórios',
        stock: 10,
      },
      {
        name: 'Shampoo Hipoalergênico',
        price: 55.0,
        image: 'https://loremflickr.com/500/500/shampoo,bottle?lock=10',
        description: 'Cuidado especial para peles sensíveis.',
        category: 'Higiene',
        stock: 60,
      },
      {
        name: 'Bolinha Interativa',
        price: 25.0,
        image: 'https://loremflickr.com/500/500/dog,ball?lock=11',
        description: 'Brinquedo que estimula a inteligência.',
        category: 'Brinquedos',
        stock: 80,
      },
      {
        name: 'Transportadora Segura',
        price: 180.0,
        image: 'https://loremflickr.com/500/500/pet,carrier?lock=12',
        description: 'Segurança e conforto para viagens.',
        category: 'Acessórios',
        stock: 25,
      },
    ],
  });
  console.log('Products seeded');

  // Seed Testimonials
  await prisma.testimonial.deleteMany({});

  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Renato Santos',
        role: 'Tutor de gato',
        image: '/assets/icons/Picture/Picture1.svg',
        feedback:
          'O serviço simplificou o treinamento e me manteve atualizado sobre a saúde do meu amigo peludo. Nunca foi tão fácil proporcionar o melhor para ele. Recomendo a todos os amantes de animais!',
      },
      {
        name: 'Giovanna Lima',
        role: 'Tutor de cachorro',
        image: '/assets/icons/Picture/Picture2.svg',
        feedback:
          'Desde que comecei a usar os serviços, percebi uma mudança positiva no comportamento do meu pet. As dicas de adestramento são valiosas!',
      },
      {
        name: 'Karla Santana',
        role: 'Tutor de gato',
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
