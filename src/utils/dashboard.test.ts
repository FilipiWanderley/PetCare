import { describe, it, expect } from 'vitest';
import { filterAppointments } from './dashboard';
import { Appointment } from '@/types';

describe('filterAppointments', () => {
  const mockAppointments: Appointment[] = [
    {
      id: '1',
      petName: 'Rex',
      ownerName: 'Ana',
      status: 'pending',
      service: 'banho',
      phone: '123456789',
      date: '2024-01-01T10:00:00Z',
    },
    {
      id: '2',
      petName: 'Luna',
      ownerName: 'Carlos',
      status: 'confirmed',
      service: 'tosa',
      phone: '987654321',
      date: '2024-01-02T11:00:00Z',
    },
    {
      id: '3',
      petName: 'Thor',
      ownerName: 'Ana',
      status: 'cancelled',
      service: 'consulta',
      phone: '123456789',
      date: '2024-01-03T12:00:00Z',
    },
  ];

  it('should filter by status', () => {
    const pending = filterAppointments(mockAppointments, '', 'pending');
    expect(pending).toHaveLength(1);
    expect(pending[0].petName).toBe('Rex');

    const confirmed = filterAppointments(mockAppointments, '', 'confirmed');
    expect(confirmed).toHaveLength(1);
    expect(confirmed[0].petName).toBe('Luna');

    const all = filterAppointments(mockAppointments, '', 'all');
    expect(all).toHaveLength(3);
  });

  it('should filter by search term (pet name)', () => {
    const result = filterAppointments(mockAppointments, 'Rex', 'all');
    expect(result).toHaveLength(1);
    expect(result[0].petName).toBe('Rex');
  });

  it('should filter by search term (owner name)', () => {
    const result = filterAppointments(mockAppointments, 'Ana', 'all');
    expect(result).toHaveLength(2); // Rex and Thor
  });

  it('should filter by both search term and status', () => {
    const result = filterAppointments(mockAppointments, 'Ana', 'pending');
    expect(result).toHaveLength(1);
    expect(result[0].petName).toBe('Rex');
  });

  it('should handle case insensitive search', () => {
    const result = filterAppointments(mockAppointments, 'rex', 'all');
    expect(result).toHaveLength(1);
    expect(result[0].petName).toBe('Rex');
  });
});
