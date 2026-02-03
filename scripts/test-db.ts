
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  console.log('🔍 Iniciando diagnóstico de conexão com o banco de dados...');
  
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ ERRO: Variável de ambiente DATABASE_URL não encontrada!');
    process.exit(1);
  }

  // Mask password for logging
  const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ':****@');
  console.log(`📡 URL de Conexão: ${maskedUrl}`);

  try {
    console.log('⏳ Tentando conectar ao banco de dados...');
    await prisma.$connect();
    console.log('✅ Conexão estabelecida com sucesso!');
    
    // Test basic query
    console.log('⏳ Executando query de teste (SELECT 1)...');
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('✅ Query executada com sucesso:', result);

    // Check tables
    console.log('⏳ Verificando contagem de registros...');
    
    try {
      const productCount = await prisma.product.count();
      console.log(`📦 Produtos: ${productCount}`);
    } catch (e: any) {
      console.error('❌ Erro ao contar Produtos:', e.message || e);
    }

    try {
      const serviceCount = await prisma.service.count();
      console.log(`🛠️ Serviços: ${serviceCount}`);
    } catch (e: any) {
      console.error('❌ Erro ao contar Serviços:', e.message || e);
    }

    try {
      const testimonialCount = await prisma.testimonial.count();
      console.log(`💬 Depoimentos: ${testimonialCount}`);
    } catch (e: any) {
      console.error('❌ Erro ao contar Depoimentos:', e.message || e);
    }

  } catch (error) {
    console.error('❌ FALHA CRÍTICA NA CONEXÃO:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
