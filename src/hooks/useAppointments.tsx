'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appointment, CreateAppointmentData } from '@/types';
import { createAppointment, getAppointments } from '@/actions/appointment-actions';
import { useAuth } from './useAuth';

interface AppointmentsContextData {
  appointments: Appointment[];
  addAppointment: (data: CreateAppointmentData) => Promise<void>;
  removeAppointment: (id: string) => void;
  confirmAppointment: (id: string) => void;
  cancelAppointment: (id: string) => void;
  isLoading: boolean;
  stats: {
    total: number;
    confirmed: number;
    pending: number;
    cancelled: number;
  };
}

const AppointmentsContext = createContext<AppointmentsContextData | null>(null);

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const result = await getAppointments();
      if (result.success && result.data) {
        setAppointments(result.data as Appointment[]);
      }
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load from server on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchAppointments();
    } else {
      setAppointments([]);
      setIsLoading(false);
    }
  }, [user]);

  const addAppointment = async (data: CreateAppointmentData) => {
    // Optimistic update
    const tempId = crypto.randomUUID();
    const newAppointment: Appointment = {
      id: tempId,
      status: 'pending',
      ...data,
    };

    setAppointments((state) => [newAppointment, ...state]);

    try {
      const result = await createAppointment(data);
      if (!result.success) {
        throw new Error(result.error?.message || 'Unknown error');
      }
      // Reload to get real ID and data
      await fetchAppointments();
    } catch (error) {
      console.error('Failed to create appointment', error);
      // Revert optimistic update
      setAppointments((state) => state.filter((apt) => apt.id !== tempId));
      alert('Erro ao criar agendamento. Tente novamente.');
    }
  };

  const removeAppointment = (id: string) => {
    // Implement delete action if needed
    setAppointments((state) => state.filter((apt) => apt.id !== id));
  };

  const confirmAppointment = (id: string) => {
    setAppointments((state) =>
      state.map((apt) => (apt.id === id ? { ...apt, status: 'confirmed' } : apt))
    );
  };

  const cancelAppointment = (id: string) => {
    setAppointments((state) =>
      state.map((apt) => (apt.id === id ? { ...apt, status: 'cancelled' } : apt))
    );
  };

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        removeAppointment,
        confirmAppointment,
        cancelAppointment,
        isLoading,
        stats,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
}
