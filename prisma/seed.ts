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

  // Seed Initial Services (if empty)
  const servicesCount = await prisma.service.count();
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
    console.log('Services seeded');
  }

  // Seed Initial Products (if empty)
  const productsCount = await prisma.product.count();
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
    console.log('Products seeded');
  }

  // Seed Initial Testimonials (if empty)
  const testimonialsCount = await prisma.testimonial.count();
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
    console.log('Testimonials seeded');
  }
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
