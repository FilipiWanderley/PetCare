'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser, logoutUser } from '@/actions/auth-actions';
import type { User, LoginCredentials, RegisterCredentials } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: LoginCredentials, shouldRedirect?: boolean) => Promise<User | undefined>;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, initialUser }: { children: ReactNode, initialUser: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Update user if initialUser changes (e.g. after revalidation)
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const signIn = async (credentials: LoginCredentials, shouldRedirect = true) => {
    setIsLoading(true);
    try {
      const result = await loginUser(credentials);
      if (result.success && result.user) {
        setUser(result.user);
        router.refresh();
        
        if (shouldRedirect) {
          if (result.user.role === 'admin') {
            router.push('/dashboard');
          } else {
            router.push('/');
          }
        }
        return result.user;
      } else {
        throw new Error(result.error || 'Login failed');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const result = await registerUser(credentials);
      if (result.success && result.user) {
        setUser(result.user);
        router.refresh();
        router.push('/');
      } else {
        throw new Error(result.error || 'Registration failed');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await logoutUser();
    setUser(null);
    router.refresh();
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
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
