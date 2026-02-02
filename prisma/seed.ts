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
