'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';
import type { LoginCredentials } from '@/lib/auth';

export default function LoginPage() {
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryStatus, setRecoveryStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    setError(null);
    setIsLoading(true);
    try {
      await signIn(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao fazer login');
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
          <h1 className={styles.title}>Bem-vindo</h1>
          <p className={styles.subtitle}>Entre com suas credenciais para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="cliente@petcare.com"
              {...register('email', { required: 'Email é obrigatório' })}
            />
            {errors.email && <span className={styles.subtitle} style={{ color: 'red' }}>{errors.email.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              {...register('password', { required: 'Senha é obrigatória' })}
            />
            {errors.password && <span className={styles.subtitle} style={{ color: 'red' }}>{errors.password.message}</span>}
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

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? <div className={styles.spinner} /> : 'Entrar'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Não tem uma conta? </span>
          <Link href="/cadastro" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            Cadastre-se
          </Link>
        </div>
      </div>

      {showForgotPassword && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h2 className={styles.title}>Recuperar Senha</h2>
              <p className={styles.subtitle}>Digite seu email para receber as instruções.</p>
            </div>

            {recoveryStatus === 'sent' ? (
              <div className={styles.successMessage}>
                Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="recovery-email" className={styles.label}>Email cadastrado</label>
                  <input
                    id="recovery-email"
                    type="email"
                    className={styles.input}
                    placeholder="seu@email.com"
                    required
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                  />
                </div>

                <div className={styles.modalActions}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setShowForgotPassword(false)}
                    disabled={recoveryStatus === 'sending'}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className={styles.button}
                    disabled={recoveryStatus === 'sending'}
                  >
                    {recoveryStatus === 'sending' ? 'Enviando...' : 'Enviar Email'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
