'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';
import type { RegisterCredentials } from '@/lib/auth';

type RegisterForm = RegisterCredentials & { confirmPassword: string };

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    setError(null);
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = data;
      await signUp(registerData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao criar a conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Crie sua conta</h1>
          <p className={styles.subtitle}>Preencha os dados abaixo para começar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Nome Completo</label>
            <input
              id="name"
              type="text"
              className={styles.input}
              placeholder="Seu nome"
              {...register('name', { required: 'Nome é obrigatório' })}
            />
            {errors.name && <span className={styles.subtitle} style={{ color: 'red' }}>{errors.name.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="seu@email.com"
              {...register('email', { 
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
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
              {...register('password', { 
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter pelo menos 6 caracteres'
                }
              })}
            />
            {errors.password && <span className={styles.subtitle} style={{ color: 'red' }}>{errors.password.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              {...register('confirmPassword', { 
                required: 'Confirmação de senha é obrigatória',
                validate: value => value === password || 'As senhas não conferem'
              })}
            />
            {errors.confirmPassword && <span className={styles.subtitle} style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? <div className={styles.spinner} /> : 'Cadastrar'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Já tem uma conta? </span>
          <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            Entre agora
          </Link>
        </div>
      </div>
    </div>
  );
}
