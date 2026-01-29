import { PrismaClient } from '@prisma/client';

/**
 * Global Prisma Client instance to prevent multiple connections in development.
 * 
 * In development, Next.js HMR (Hot Module Replacement) can instantiate multiple Prisma Clients,
 * exhausting the database connection limit. We attach the client to the global object
 * to ensure a singleton instance.
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
