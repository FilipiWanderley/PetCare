import { z } from 'zod';
import { ErrorMessages } from '@/lib/errors';

export const AppointmentSchema = z.object({
  service: z.string().min(1, ErrorMessages.VALIDATION_REQUIRED),
  date: z.string().datetime({ message: ErrorMessages.VALIDATION_DATE_INVALID }), // ISO string validation
  ownerName: z.string().optional(),
  petName: z.string().optional(),
  phone: z.string().min(10, ErrorMessages.VALIDATION_PHONE_INVALID),
});

export type CreateAppointmentDTO = z.infer<typeof AppointmentSchema>;
