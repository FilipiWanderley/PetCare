'use server';

import { prisma } from '@/lib/db';
import { createSession, deleteSession } from '@/lib/session';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { RegisterCredentials, LoginCredentials } from '@/lib/auth'; // We'll update lib/auth types or just redefine here

import { v4 as uuidv4 } from 'uuid';
import { sendConfirmationEmail } from '@/lib/email';

const RegisterSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
});

const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export async function registerUser(data: any) {
  const result = RegisterSchema.safeParse(data);

  if (!result.success) {
    // Return the first error message
    const errorMessage = result.error.errors?.[0]?.message || 'Dados inválidos';
    return { success: false, error: errorMessage };
  }

  const { email, password, name } = result.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: 'Email já cadastrado' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = uuidv4();
    const confirmationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        confirmationToken,
        confirmationTokenExpires,
        emailVerified: null,
      },
    });

    await sendConfirmationEmail(email, confirmationToken);

    // Log the event
    console.log(`[AUTH] New user registered: ${email}, ID: ${user.id}`);

    // No session creation - require verification
    return { 
      success: true, 
      message: 'Cadastro realizado! Verifique seu e-mail para ativar sua conta.' 
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Erro ao criar conta' };
  }
}

export async function verifyEmail(token: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { confirmationToken: token },
    });

    if (!user) {
      return { success: false, error: 'Token de confirmação inválido.' };
    }

    // Check expiration
    if (user.confirmationTokenExpires && user.confirmationTokenExpires < new Date()) {
      return { success: false, error: 'Token de confirmação expirado.' };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        confirmationToken: null,
        confirmationTokenExpires: null,
      },
    });

    console.log(`[AUTH] Email verified for user: ${user.email}`);

    // Auto-login: Create session
    await createSession(user.id, user.role);

    return { success: true };
  } catch (error) {
    console.error('Verification error:', error);
    return { success: false, error: 'Erro ao verificar e-mail.' };
  }
}

export async function loginUser(data: any) {
  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: 'Dados inválidos' };
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: 'Credenciais inválidas' };
    }

    // Check if email is verified
    // Allow admin bypass if needed, but safer to enforce
    // For now, if it's an old user (emailVerified is null but no confirmationToken?), 
    // we might want to allow login or force verification. 
    // Assuming new flow:
    if (!user.emailVerified) {
       // Optional: Resend email logic could be here
       return { success: false, error: 'E-mail não verificado. Por favor, verifique sua caixa de entrada.' };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { success: false, error: 'Credenciais inválidas' };
    }

    await createSession(user.id, user.role);
    return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Erro ao fazer login' };
  }
}

export async function logoutUser() {
  await deleteSession();
  redirect('/login');
}
