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
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setSuccess((result as any).message || 'Cadastro realizado com sucesso!');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setError((result as any).error?.message || 'Erro ao realizar cadastro');
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

          <div className={clsx(styles.alert, styles.alertSuccess)}>{success}</div>

          <p className={styles.loginLink} style={{ textAlign: 'left', lineHeight: '1.5' }}>
            Enviamos um link de confirmação para o seu e-mail. Por favor, verifique sua caixa de
            entrada (e spam) para ativar sua conta.
          </p>

          <div className={styles.loginLink}>
            <Link href="/login" className={styles.link}>
              <Button variant="outline" fullWidth>
                Voltar para Login
              </Button>
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

        {error && <div className={clsx(styles.alert, styles.alertError)}>{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Nome Completo"
            placeholder="Seu nome"
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
          />

          <Input
            label="Confirmar Senha"
            type="password"
            placeholder="••••••••"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button type="submit" fullWidth isLoading={isLoading} size="lg">
            Criar Conta
          </Button>
        </form>

        <div className={styles.loginLink}>
          Já tem uma conta?{' '}
          <Link href="/login" className={styles.link}>
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
