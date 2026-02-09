'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { withErrorHandling, AppError } from '@/lib/exceptions';
import { ErrorCodes } from '@/lib/errors';

/**
 * Creates a new pet record in the database.
 * Connects the pet to an existing owner via email.
 *
 * @param {Object} data - Pet data.
 * @param {string} data.name - Name of the pet.
 * @param {string} data.species - Species (e.g., Dog, Cat).
 * @param {string} [data.breed] - Breed of the pet.
 * @param {number} data.age - Age of the pet.
 * @param {string} data.ownerEmail - Email of the owner (must exist).
 * @returns {Promise<{success: boolean, data?: any, error?: string, code?: string, message?: string}>}
 */
export async function createPet(data: {
  name: string;
  species: string;
  breed?: string;
  age: number;
  ownerEmail: string;
}) {
  return withErrorHandling('createPet', async () => {
    const { ownerEmail, ...petData } = data;

    // Validate owner exists before trying to connect (optional but good for specific error)
    // For now letting prisma fail if not found or handling it specifically could be better
    // But sticking to the "3 biggest sources" - replacing the generic english error.

    try {
      const pet = await prisma.pet.create({
        data: {
          ...petData,
          owner: {
            connect: { email: ownerEmail },
          },
        },
      });

      revalidatePath('/dashboard');
      return pet;
    } catch (error) {
      // If prisma fails to connect, it means owner doesn't exist usually
      // We can wrap it in AppError
      throw new AppError(ErrorCodes.PET_CREATE_FAILED);
    }
  });
}

/**
 * Fetches all pets ordered by creation date (newest first).
 *
 * @returns {Promise<{success: boolean, data?: any[], error?: string, code?: string, message?: string}>}
 */
export async function getPets() {
  return withErrorHandling('getPets', async () => {
    try {
      const pets = await prisma.pet.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          owner: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
      return pets;
    } catch (error) {
      throw new AppError(ErrorCodes.PET_FETCH_FAILED);
    }
  });
}
