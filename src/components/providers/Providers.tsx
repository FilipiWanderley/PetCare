'use client';

import { AppointmentsProvider } from '@/hooks/useAppointments';
import { AuthProvider } from '@/hooks/useAuth';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        {children}
      </AppointmentsProvider>
    </AuthProvider>
  );
}
