'use server';

import { prisma } from '@/lib/db';
import { createSession, deleteSession } from '@/lib/session';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { RegisterCredentials, LoginCredentials } from '@/lib/auth'; // We'll update lib/auth types or just redefine here

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function registerUser(data: any) {
  const result = RegisterSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: 'Dados inválidos' };
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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await createSession(user.id);
    return { success: true, user: { id: user.id, name: user.name, email: user.email } };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Erro ao criar conta' };
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

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { success: false, error: 'Credenciais inválidas' };
    }

    await createSession(user.id);
    return { success: true, user: { id: user.id, name: user.name, email: user.email } };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Erro ao fazer login' };
  }
}

export async function logoutUser() {
  await deleteSession();
  redirect('/login');
}
