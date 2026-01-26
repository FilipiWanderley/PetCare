'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import * as authLib from '@/lib/auth';
import type { User, LoginCredentials } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Initial auth check
    const checkAuth = () => {
      const currentUser = authLib.getUser();
      const isAuth = authLib.isAuthenticated();
      
      if (isAuth && currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const { user: loggedUser } = await authLib.signIn(credentials);
      setUser(loggedUser);
      router.refresh(); // Ensure middleware sees the new cookie
      router.push('/dashboard');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    authLib.signOut();
    setUser(null);
    router.refresh(); // Clear Next.js router cache
    router.replace('/login'); // Use replace instead of push to prevent back navigation
  };

  const value = {
    user,
    isLoading,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
