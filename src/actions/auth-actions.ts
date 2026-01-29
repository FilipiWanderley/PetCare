'use server';

import { prisma } from '@/lib/db';
import { createSession, deleteSession } from '@/lib/session';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { sendConfirmationEmail } from '@/lib/email';

// Validation Schemas
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

/**
 * Registers a new user in the system.
 * Handles password hashing, unique email validation, and confirmation email sending.
 * 
 * @param {any} data - Raw form data containing name, email, and password.
 * @returns {Promise<{success: boolean, error?: string, message?: string}>} Registration result.
 */
export async function registerUser(data: any) {
  const result = RegisterSchema.safeParse(data);

  if (!result.success) {
    const errorMessage = result.error.issues?.[0]?.message || 'Dados inválidos';
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
    // Token expires in 24 hours
    const confirmationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

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

    console.log(`[AUTH] New user registered: ${email}, ID: ${user.id}`);

    return { 
      success: true, 
      message: 'Cadastro realizado! Verifique seu e-mail para ativar sua conta.' 
    };
  } catch (error) {
    console.error('[AUTH] Registration error:', error);
    return { success: false, error: 'Erro ao criar conta' };
  }
}

/**
 * Verifies a user's email address using a token.
 * Updates the user's status to verified if the token is valid and not expired.
 * 
 * @param {string} token - The confirmation token sent via email.
 * @returns {Promise<{success: boolean, error?: string}>} Verification result.
 */
export async function verifyEmail(token: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { confirmationToken: token },
    });

    if (!user) {
      return { success: false, error: 'Token de confirmação inválido.' };
    }

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
    
    // Note: We intentionally do not create a session here to avoid cookie issues in Server Components.
    // The user must log in manually after verification.
    return { success: true };
  } catch (error) {
    console.error('[AUTH] Verification error:', error);
    return { success: false, error: 'Erro ao verificar e-mail.' };
  }
}

/**
 * Authenticates a user and creates a session.
 * 
 * @param {any} data - Login credentials (email, password).
 * @returns {Promise<{success: boolean, user?: any, error?: string}>} Login result with user data or error.
 */
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

    if (!user.emailVerified) {
       return { success: false, error: 'E-mail não verificado. Por favor, verifique sua caixa de entrada.' };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { success: false, error: 'Credenciais inválidas' };
    }

    await createSession(user.id, user.role);
    return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  } catch (error) {
    console.error('[AUTH] Login error:', error);
    return { success: false, error: 'Erro ao fazer login' };
  }
}

/**
 * Logs out the current user by deleting the session and redirecting to login.
 */
export async function logoutUser() {
  await deleteSession();
  redirect('/login');
}
