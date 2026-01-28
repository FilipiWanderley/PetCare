'use client';

import { AppointmentsProvider } from '@/hooks/useAppointments';
import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';
import type { User } from '@/lib/auth';

export function Providers({ children, initialUser }: { children: React.ReactNode, initialUser: User | null }) {
  return (
    <AuthProvider initialUser={initialUser}>
      <AppointmentsProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AppointmentsProvider>
    </AuthProvider>
  );
}
