import { prisma } from '@/lib/db';
import { CreateAppointmentDTO } from '@/lib/schemas/appointment';

export class AppointmentService {
  /**
   * Creates a new appointment.
   * Isolates DB logic from Controller/Action logic.
   */
  static async create(data: CreateAppointmentDTO, userId?: string) {
    const appointmentDate = new Date(data.date);

    // Business Logic: Prevent past dates (Example)
    if (appointmentDate < new Date()) {
      throw new Error('Não é possível agendar para uma data passada.');
    }

    return await prisma.appointment.create({
      data: {
        date: appointmentDate,
        service: data.service,
        phone: data.phone,
        guestName: data.ownerName,
        guestPet: data.petName,
        ownerId: userId || null,
        status: 'pending',
      },
    });
  }

  static async findAllByUserId(userId: string) {
    return await prisma.appointment.findMany({
      where: { ownerId: userId },
      orderBy: { date: 'desc' },
      include: { pet: true },
    });
  }

  static async findAll() {
    return await prisma.appointment.findMany({
      orderBy: { date: 'desc' },
      include: { pet: true },
    });
  }
}
