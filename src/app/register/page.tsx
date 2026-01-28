
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { registerUser } from '@/actions/auth-actions';

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (result.success) {
        setSuccess(result.message || 'Cadastro realizado com sucesso!');
      } else {
        setError(result.error || 'Erro ao realizar cadastro');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Verifique seu E-mail</h1>
            <p className={styles.subtitle}>Cadastro realizado com sucesso!</p>
          </div>
          
          <div className={clsx(styles.alert, styles.alertSuccess)}>
            {success}
          </div>

          <p className={styles.loginLink} style={{ textAlign: 'left', lineHeight: '1.5' }}>
            Enviamos um link de confirmação para o seu e-mail. Por favor, verifique sua caixa de entrada (e spam) para ativar sua conta.
          </p>

          <div className={styles.loginLink}>
            <Link href="/login" className={styles.link}>
              Voltar para Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Crie sua conta</h1>
          <p className={styles.subtitle}>Preencha seus dados para começar</p>
        </div>

        {error && (
          <div className={clsx(styles.alert, styles.alertError)}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Nome Completo</label>
            <input
              id="name"
              type="text"
              className={clsx(styles.input, errors.name && styles.errorInput)}
              placeholder="Seu nome"
              {...register('name')}
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>E-mail</label>
            <input
              id="email"
              type="email"
              className={clsx(styles.input, errors.email && styles.errorInput)}
              placeholder="seu@email.com"
              {...register('email')}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              id="password"
              type="password"
              className={clsx(styles.input, errors.password && styles.errorInput)}
              placeholder="********"
              {...register('password')}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <span style={{ fontSize: '0.7rem', color: '#666' }}>
              Mínimo 8 caracteres, maiúscula, minúscula e número.
            </span>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              className={clsx(styles.input, errors.confirmPassword && styles.errorInput)}
              placeholder="********"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>}
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className={styles.loginLink}>
          Já tem uma conta?{' '}
          <Link href="/login" className={styles.link}>
            Fazer Login
          </Link>
        </div>
      </div>
    </div>
  );
}
