'use server';

import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { sendConfirmationEmail } from '@/lib/email';
import { RegisterSchema, LoginSchema } from '@/lib/schemas/auth';
import { AuthService } from '@/services/auth.service';
import { ErrorCodes, errorResponse, AppError } from '@/lib/errors';
import { logger } from '@/lib/logger';

/**
 * Registers a new user in the system.
 * Handles password hashing, unique email validation, and confirmation email sending.
 *
 * @param {unknown} data - Raw form data containing name, email, and password.
 * @returns {Promise<{success: boolean, error?: string, code?: string, message?: string, status?: number}>} Registration result.
 */
export async function registerUser(data: unknown) {
  const result = RegisterSchema.safeParse(data);

  if (!result.success) {
    const errorMessage = result.error.issues?.[0]?.message;
    return errorResponse(ErrorCodes.AUTH_INVALID_DATA, errorMessage);
  }

  const { email } = result.data;

  try {
    const existingUser = await AuthService.findByEmail(email);

    if (existingUser) {
      return errorResponse(ErrorCodes.AUTH_EMAIL_ALREADY_EXISTS);
    }

    const { user, confirmationToken } = await AuthService.register(result.data);

    await sendConfirmationEmail(email, confirmationToken);

    logger.info(`[AUTH] New user registered: ${email}, ID: ${user.id}`);

    return {
      success: true,
      message: 'Cadastro realizado! Verifique seu e-mail para ativar sua conta.',
    };
  } catch (error) {
    logger.error('[AUTH] Registration error:', { error });
    if (error instanceof AppError) {
      return errorResponse(error.code, error.message);
    }
    return errorResponse('AUTH_REGISTRATION_FAILED');
  }
}

/**
 * Verifies a user's email address using a token.
 * Updates the user's status to verified if the token is valid and not expired.
 *
 * @param {string} token - The confirmation token sent via email.
 * @returns {Promise<{success: boolean, error?: string, code?: string, message?: string, status?: number}>} Verification result.
 */
export async function verifyEmail(token: string) {
  try {
    const user = await AuthService.findByConfirmationToken(token);

    if (!user) {
      return errorResponse(ErrorCodes.AUTH_INVALID_TOKEN);
    }

    if (user.confirmationTokenExpires && user.confirmationTokenExpires < new Date()) {
      return errorResponse('AUTH_TOKEN_EXPIRED');
    }

    const updatedUser = await AuthService.verifyUserEmail(user.id);

    // Auto-login after verification
    await createSession(updatedUser.id, updatedUser.role);

    return { success: true };
  } catch (error) {
    logger.error('[AUTH] Email verification error:', { error });
    if (error instanceof AppError) {
      return errorResponse(error.code, error.message);
    }
    return errorResponse(ErrorCodes.AUTH_VERIFICATION_FAILED);
  }
}

/**
 * Authenticates a user and creates a session.
 *
 * @param {unknown} data - Login credentials (email, password).
 * @returns {Promise<{success: boolean, user?: unknown, error?: string, code?: string, message?: string, status?: number}>} Login result with user data or error.
 */
export async function loginUser(data: unknown) {
  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    return errorResponse('AUTH_INVALID_DATA');
  }

  const { email, password } = result.data;

  try {
    const user = await AuthService.findByEmail(email);

    if (!user) {
      return errorResponse(ErrorCodes.AUTH_INVALID_CREDENTIALS);
    }

    const isValid = await AuthService.validatePassword(password, user.password);

    if (!isValid) {
      return errorResponse(ErrorCodes.AUTH_INVALID_CREDENTIALS);
    }

    if (!user.emailVerified) {
      // Optional: Enforce email verification
      // return errorResponse(ErrorCodes.AUTH_EMAIL_NOT_VERIFIED);
    }

    await createSession(user.id, user.role);

    return {
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  } catch (error) {
    logger.error('[AUTH] Login error:', { error });
    if (error instanceof AppError) {
      return errorResponse(error.code, error.message);
    }
    return errorResponse('AUTH_INVALID_CREDENTIALS'); // Don't expose internal errors on login
  }
}

export async function logoutUser() {
  await deleteSession();
  redirect('/login');
}
