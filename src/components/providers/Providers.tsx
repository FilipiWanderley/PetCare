'use client';

import { AppointmentsProvider } from '@/hooks/useAppointments';
import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AppointmentsProvider>
    </AuthProvider>
  );
}
