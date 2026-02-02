
import { describe, it, expect } from 'vitest';
import { filterAppointments, Appointment } from '@/utils/dashboard';

describe('filterAppointments', () => {
  const mockAppointments: Appointment[] = [
    { id: '1', petName: 'Rex', ownerName: 'Ana', status: 'pending' },
    { id: '2', petName: 'Luna', ownerName: 'Carlos', status: 'confirmed' },
    { id: '3', petName: 'Thor', ownerName: 'Ana', status: 'cancelled' },
  ];

  it('should return all appointments when search is empty and filter is all', () => {
    const result = filterAppointments(mockAppointments, '', 'all');
    expect(result).toHaveLength(3);
  });

  it('should filter by pet name', () => {
    const result = filterAppointments(mockAppointments, 'Rex', 'all');
    expect(result).toHaveLength(1);
    expect(result[0].petName).toBe('Rex');
  });

  it('should filter by owner name', () => {
    const result = filterAppointments(mockAppointments, 'Ana', 'all');
    expect(result).toHaveLength(2);
  });

  it('should filter by status', () => {
    const result = filterAppointments(mockAppointments, '', 'confirmed');
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('confirmed');
  });

  it('should filter by search AND status', () => {
    const result = filterAppointments(mockAppointments, 'Ana', 'pending');
    expect(result).toHaveLength(1);
    expect(result[0].petName).toBe('Rex');
  });

  it('should handle case insensitive search', () => {
    const result = filterAppointments(mockAppointments, 'rex', 'all');
    expect(result).toHaveLength(1);
  });
});
