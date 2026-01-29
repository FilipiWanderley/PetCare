'use server'

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

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
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function createPet(data: {
  name: string;
  species: string;
  breed?: string;
  age: number;
  ownerEmail: string;
}) {
  try {
    const { ownerEmail, ...petData } = data;
    
    const pet = await prisma.pet.create({
      data: {
        ...petData,
        owner: {
          connect: { email: ownerEmail },
        },
      },
    });
    
    revalidatePath('/dashboard');
    return { success: true, data: pet };
  } catch (error) {
    console.error('Failed to create pet:', error);
    return { success: false, error: 'Failed to create pet' };
  }
}

/**
 * Fetches all pets ordered by creation date (newest first).
 * 
 * @returns {Promise<{success: boolean, data?: any[], error?: string}>}
 */
export async function getPets() {
  try {
    const pets = await prisma.pet.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return { success: true, data: pets };
  } catch (error) {
    console.error('Failed to fetch pets:', error);
    return { success: false, error: 'Failed to fetch pets' };
  }
}
