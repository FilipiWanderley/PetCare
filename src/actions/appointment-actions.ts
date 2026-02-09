'use server';

import { getSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { AppointmentSchema } from '@/lib/schemas/appointment';
import { AppointmentService } from '@/services/appointment.service';
import { withErrorHandling, AppError } from '@/lib/exceptions';
import { ErrorCodes } from '@/lib/errors';
import { prisma } from '@/lib/db';
import { ServiceType, AppointmentStatus } from '@/types';

export async function createAppointment(data: unknown) {
  return withErrorHandling('createAppointment', async () => {
    const result = AppointmentSchema.safeParse(data);

    if (!result.success) {
      // Use ErrorCodes.AUTH_INVALID_DATA or a generic INVALID_DATA if exists.
      // Reusing AUTH_INVALID_DATA as it maps to "Dados inválidos"
      throw new AppError(ErrorCodes.AUTH_INVALID_DATA);
    }

    const session = await getSession();
    await AppointmentService.create(result.data, session?.userId as string);

    revalidatePath('/agendamentos');
    revalidatePath('/dashboard');
    return null; // or success message
  });
}

export async function getAppointments() {
  return withErrorHandling('getAppointments', async () => {
    const session = await getSession();

    if (!session?.userId) {
      return [];
    }

    let appointments;
    const userId = session.userId as string;

    if (session.role === 'admin') {
      appointments = await AppointmentService.findAll();
    } else {
      appointments = await AppointmentService.findAllByUserId(userId);
    }

    // Map to frontend structure (DTO transformation)
    const mapped = appointments.map((apt) => ({
      id: apt.id,
      ownerName: apt.guestName || 'Cliente Cadastrado',
      petName: apt.guestPet || apt.pet?.name || 'Pet',
      service: apt.service as ServiceType,
      phone: apt.phone || '',
      date: apt.date.toISOString(),
      status: apt.status as AppointmentStatus,
    }));

    return mapped;
  });
}

export async function cancelAppointment(id: string) {
  return withErrorHandling('cancelAppointment', async () => {
    const session = await getSession();
    if (!session?.userId) {
      throw new AppError('AUTH_INVALID_CREDENTIALS', 'Não autorizado');
    }

    // Verify ownership
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment || appointment.ownerId !== session.userId) {
      throw new AppError('AUTH_INVALID_DATA', 'Agendamento não encontrado ou acesso negado');
    }

    await prisma.appointment.update({
      where: { id },
      data: { status: 'cancelled' },
    });

    revalidatePath('/dashboard');
    return null;
  });
}

export async function deleteAppointment(id: string) {
  return withErrorHandling('deleteAppointment', async () => {
    const session = await getSession();
    if (!session?.userId) {
      throw new AppError('AUTH_INVALID_CREDENTIALS', 'Não autorizado');
    }

    // Verify ownership
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment || appointment.ownerId !== session.userId) {
      throw new AppError('AUTH_INVALID_DATA', 'Agendamento não encontrado ou acesso negado');
    }

    await prisma.appointment.delete({
      where: { id },
    });

    revalidatePath('/dashboard');
    return null;
  });
}
