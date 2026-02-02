'use server';

import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const AppointmentSchema = z.object({
  service: z.string(),
  date: z.string(), // ISO string
  ownerName: z.string().optional(),
  petName: z.string().optional(),
  phone: z.string(),
});

export async function createAppointment(data: any) {
  const result = AppointmentSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: 'Dados inválidos' };
  }

  const { service, date, ownerName, petName, phone } = result.data;
  const session = await getSession();

  try {
    let petId = null;
    let ownerId = null;

    if (session?.userId) {
      ownerId = session.userId;
      // In a future update, we could link to a real pet if selected
    }

    // Convert date string to Date object
    const appointmentDate = new Date(date);

    await prisma.appointment.create({
      data: {
        date: appointmentDate,
        service,
        phone,
        guestName: ownerName,
        guestPet: petName,
        ownerId: ownerId,
        status: 'pending',
      },
    });

    revalidatePath('/agendamentos');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Create appointment error:', error);
    return { success: false, error: 'Erro ao agendar' };
  }
}

export async function getAppointments() {
  const session = await getSession();
  
  if (!session?.userId) {
    // Return empty array for non-authenticated users instead of potentially exposing guest appointments
    // Or we could implement a logic to show guest appointments if we had a guest session/cookie
    return { success: true, data: [] };
  }

  try {
    let whereClause: any = {
      ownerId: session.userId,
    };

    // If admin, show all appointments including guests
    if (session.role === 'admin') {
      whereClause = {}; // No filter, get everything
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      orderBy: {
        date: 'desc',
      },
      include: {
        pet: true,
      },
    });
    
    // Map to frontend structure
    const mapped = appointments.map(apt => ({
      id: apt.id,
      ownerName: apt.guestName || 'Cliente Cadastrado', // Fallback for registered users
      petName: apt.guestPet || apt.pet?.name || 'Pet',
      service: apt.service as any,
      phone: apt.phone || '',
      date: apt.date.toISOString(),
      status: apt.status as any,
    }));

    return { success: true, data: mapped };
  } catch (error) {
    console.error('Get appointments error:', error);
    return { success: false, error: 'Erro ao buscar agendamentos' };
  }
}

export async function cancelAppointment(id: string) {
  const session = await getSession();
  if (!session?.userId) return { success: false, error: 'Não autorizado' };

  try {
    // Verify ownership
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment || appointment.ownerId !== session.userId) {
      return { success: false, error: 'Agendamento não encontrado ou acesso negado' };
    }

    await prisma.appointment.update({
      where: { id },
      data: { status: 'cancelled' },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Cancel appointment error:', error);
    return { success: false, error: 'Erro ao cancelar agendamento' };
  }
}

export async function deleteAppointment(id: string) {
  const session = await getSession();
  if (!session?.userId) return { success: false, error: 'Não autorizado' };

  try {
    // Verify ownership
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment || appointment.ownerId !== session.userId) {
      return { success: false, error: 'Agendamento não encontrado ou acesso negado' };
    }

    await prisma.appointment.delete({
      where: { id },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Delete appointment error:', error);
    return { success: false, error: 'Erro ao excluir agendamento' };
  }
}

// For admin or future use
export async function confirmAppointment(id: string) {
    // Ideally check for admin role here
    try {
        await prisma.appointment.update({
            where: { id },
            data: { status: 'confirmed' },
        });
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Confirm appointment error:', error);
        return { success: false, error: 'Erro ao confirmar agendamento' };
    }
}
