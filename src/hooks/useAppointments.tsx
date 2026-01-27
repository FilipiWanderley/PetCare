'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appointment, CreateAppointmentData } from '@/types';
import { getFromStorage, saveToStorage, STORAGE_KEY } from '@/lib/storage';

interface AppointmentsContextData {
  appointments: Appointment[];
  addAppointment: (data: CreateAppointmentData) => void;
  removeAppointment: (id: string) => void;
  confirmAppointment: (id: string) => void;
  cancelAppointment: (id: string) => void;
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
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    // Wrap in setTimeout to avoid "setState synchronously within effect" warning
    setTimeout(() => {
      const stored = getFromStorage<Appointment[]>(STORAGE_KEY);
      if (stored) {
        setAppointments(stored);
      }
      setIsLoaded(true);
    }, 0);
  }, []);

  // Save to storage on change
  useEffect(() => {
    if (isLoaded) {
      saveToStorage(STORAGE_KEY, appointments);
    }
  }, [appointments, isLoaded]);

  const addAppointment = (data: CreateAppointmentData) => {
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      status: 'pending',
      ...data,
    };
    setAppointments((state) => [newAppointment, ...state]);
  };

  const removeAppointment = (id: string) => {
    setAppointments((state) => state.filter((apt) => apt.id !== id));
  };

  const confirmAppointment = (id: string) => {
    setAppointments((state) =>
      state.map((apt) =>
        apt.id === id ? { ...apt, status: 'confirmed' } : apt
      )
    );
  };

  const cancelAppointment = (id: string) => {
    setAppointments((state) =>
      state.map((apt) =>
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      )
    );
  };

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        removeAppointment,
        confirmAppointment,
        cancelAppointment,
        stats
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
