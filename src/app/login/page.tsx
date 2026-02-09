'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from './page.module.css';
import type { LoginCredentials } from '@/lib/auth';
import clsx from 'clsx';

export default function LoginPage() {
  const { signIn, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryStatus, setRecoveryStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    setError(null);
    setIsLoading(true);
    try {
      // Pass false to handle redirect manually
      const user = await signIn(data, false);

      if (!user) {
        throw new Error('Falha na autenticação');
      }

      if (activeTab === 'admin') {
        if (user.role === 'admin') {
          router.push('/dashboard');
        } else {
          // If user tried to login as admin but is not admin
          await signOut();
          setError('Acesso não autorizado. Esta área é restrita para administradores.');
        }
      } else {
        // Client tab
        if (user.role === 'admin') {
          // Optional: Redirect admin to dashboard even if they login on client tab,
          // OR enforce they must use admin tab. Let's be helpful and redirect.
          router.push('/dashboard');
        } else {
          router.push('/');
        }
      }
    } catch (err) {
      const rawMessage = err instanceof Error ? err.message : 'Ocorreu um erro ao fazer login';
      let friendlyMessage = rawMessage;

      // Map technical errors to friendly Portuguese messages
      if (rawMessage.includes('Invalid credentials') || rawMessage.includes('Invalid password')) {
        friendlyMessage = 'E-mail ou senha incorretos. Por favor, tente novamente.';
      } else if (rawMessage.includes('User not found')) {
        friendlyMessage = 'Conta não encontrada. Verifique o e-mail ou cadastre-se.';
      } else if (rawMessage.includes('Network request failed')) {
        friendlyMessage = 'Erro de conexão. Verifique sua internet.';
      }

      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryStatus('sending');

    // Simulate API call
    setTimeout(() => {
      setRecoveryStatus('sent');
      setTimeout(() => {
        setShowForgotPassword(false);
        setRecoveryStatus('idle');
        setRecoveryEmail('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {activeTab === 'admin' ? 'Área do Administrador' : 'Bem-vindo'}
          </h1>
          <p className={styles.subtitle}>
            {activeTab === 'admin'
              ? 'Acesso restrito para gestão'
              : 'Entre com suas credenciais para continuar'}
          </p>
        </div>

        <div className={styles.tabs}>
          <button
            className={clsx(styles.tab, activeTab === 'client' && styles.activeTab)}
            onClick={() => setActiveTab('client')}
            type="button"
          >
            Cliente
          </button>
          <button
            className={clsx(styles.tab, activeTab === 'admin' && styles.activeTab)}
            onClick={() => setActiveTab('admin')}
            type="button"
          >
            Administrador
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <Input
              label="Email"
              type="email"
              placeholder={activeTab === 'admin' ? 'admin@petcare.com' : 'cliente@petcare.com'}
              {...register('email', { required: 'Email é obrigatório' })}
              error={errors.email?.message}
            />
          </div>

          <div className={styles.inputGroup}>
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'Senha é obrigatória' })}
              error={errors.password?.message}
            />
          </div>

          <div className={styles.forgotPassword}>
            <button
              type="button"
              className={styles.forgotPasswordButton}
              onClick={() => setShowForgotPassword(true)}
            >
              Esqueci minha senha
            </button>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading} size="lg">
            {activeTab === 'admin' ? 'Acessar Painel' : 'Entrar'}
          </Button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Não tem uma conta? </span>
          <Link
            href="/register"
            style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
