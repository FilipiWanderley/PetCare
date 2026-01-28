'use server'

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createPet(data: {
  name: string;
  species: string;
  breed?: string;
  age: number;
  ownerEmail: string;
}) {
  try {
    const pet = await prisma.pet.create({
      data,
    });
    
    // Revalidate the dashboard or home page where pets might be listed
    revalidatePath('/dashboard');
    return { success: true, data: pet };
  } catch (error) {
    console.error('Failed to create pet:', error);
    return { success: false, error: 'Failed to create pet' };
  }
}

export async function getPets() {
  try {
    const pets = await prisma.pet.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, data: pets };
  } catch (error) {
    console.error('Failed to fetch pets:', error);
    return { success: false, error: 'Failed to fetch pets' };
  }
}
