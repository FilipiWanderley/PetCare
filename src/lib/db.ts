import { PrismaClient } from '@prisma/client';

/**
 * PrismaClient Singleton Pattern
 *
 * Recommended pattern for Next.js in development to avoid exhausting
 * database connections due to Hot Module Replacement (HMR).
 *
 * See: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
 */

const prismaClientSingleton = () => {
  return new PrismaClient({
    // Log queries in development for better debugging
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
