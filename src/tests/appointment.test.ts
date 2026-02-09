/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAppointment } from '@/actions/appointment-actions';
import { AppointmentService } from '@/services/appointment.service';
import { ErrorCodes, HttpStatus } from '@/lib/errors';

// Mock Dependencies
vi.mock('@/services/appointment.service', () => ({
  AppointmentService: {
    create: vi.fn(),
  },
}));

vi.mock('@/lib/session', () => ({
  getSession: vi.fn().mockResolvedValue({ userId: 'user-123', role: 'user' }),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('Appointment Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create an appointment successfully', async () => {
    const validData = {
      service: 'Banho e Tosa',
      date: new Date().toISOString(), // Valid date
      ownerName: 'John Doe',
      petName: 'Rex',
      phone: '1234567890',
    };

    (AppointmentService.create as any).mockResolvedValue({ id: 'apt-1' });

    const result = await createAppointment(validData);

    expect(result.success).toBe(true);
    expect(AppointmentService.create).toHaveBeenCalled();
  });

  it('should fail validation with missing fields', async () => {
    const invalidData = {
      service: '', // Empty service
      date: 'invalid-date',
    };

    const result = await createAppointment(invalidData);

    expect(result.success).toBe(false);
    expect((result as any).error?.code).toBe(ErrorCodes.AUTH_INVALID_DATA);
    expect((result as any).error?.message_key).toBe('auth.invalid_data');
    expect((result as any).status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should handle service errors gracefully', async () => {
    const validData = {
      service: 'Banho e Tosa',
      date: new Date().toISOString(),
      ownerName: 'John Doe',
      petName: 'Rex',
      phone: '1234567890',
    };

    (AppointmentService.create as any).mockRejectedValue(new Error('Database error'));

    const result = await createAppointment(validData);

    expect(result.success).toBe(false);
    // The generic error message for non-operational errors
    expect((result as any).error?.code).toBe(ErrorCodes.INTERNAL_ERROR);
    expect((result as any).error?.message_key).toBe('generic.internal_error');
    expect((result as any).status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
