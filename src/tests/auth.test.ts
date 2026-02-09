/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser, verifyEmail } from '@/actions/auth-actions';

// Mock dependencies
vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock('@/lib/email', () => ({
  sendConfirmationEmail: vi.fn(),
}));

vi.mock('@/lib/session', () => ({
  createSession: vi.fn(),
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_password'),
  },
}));

// We need to import the mocked modules to access the mocks
import { prisma } from '@/lib/db';
import { sendConfirmationEmail } from '@/lib/email';
import { createSession } from '@/lib/session';
import { ErrorCodes, AppError, HttpStatus } from '@/lib/errors';
import { AuthService } from '@/services/auth.service';

describe('Auth Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks(); // Restore spies
  });

  describe('Register', () => {
    it('should register a new user successfully', async () => {
      // Setup mocks
      (prisma.user.findUnique as any).mockResolvedValue(null);
      (prisma.user.create as any).mockResolvedValue({
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
      });

      const data = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123', // Valid password
      };

      const result = await registerUser(data);

      expect(result.success).toBe(true);
      expect(prisma.user.create).toHaveBeenCalled();
      expect(sendConfirmationEmail).toHaveBeenCalled();
    });

    it('should fail if email already exists', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: '1' });

      const result = await registerUser({
        name: 'Test',
        email: 'existing@example.com',
        password: 'Password123',
      });

      expect(result.success).toBe(false);
      expect((result as any).error?.code).toBe(ErrorCodes.AUTH_EMAIL_ALREADY_EXISTS);
      expect((result as any).error?.message_key).toBe('auth.email_already_exists');
      expect((result as any).status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should fail with invalid data', async () => {
      const result = await registerUser({
        name: '',
        email: 'invalid-email',
        password: '123',
      });

      expect(result.success).toBe(false);
      expect((result as any).error?.code).toBe(ErrorCodes.AUTH_INVALID_DATA);
      expect((result as any).status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should handle AppError thrown by service', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);

      // Simulate Service throwing AppError
      vi.spyOn(AuthService, 'register').mockImplementationOnce(() => {
        throw new AppError(ErrorCodes.AUTH_REGISTRATION_FAILED);
      });

      const result = await registerUser({
        name: 'Test',
        email: 'fail@example.com',
        password: 'Password123',
      });

      expect(result.success).toBe(false);
      expect((result as any).error?.code).toBe(ErrorCodes.AUTH_REGISTRATION_FAILED);
      expect((result as any).status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('Verify Email', () => {
    it('should verify email and auto-login', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        role: 'user',
        confirmationTokenExpires: new Date(Date.now() + 10000), // Valid
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);
      (prisma.user.update as any).mockResolvedValue({ ...mockUser, emailVerified: new Date() });

      const result = await verifyEmail('valid-token');

      expect(result.success).toBe(true);
      expect(prisma.user.update).toHaveBeenCalled();
      expect(createSession).toHaveBeenCalled();
    });

    it('should fail with invalid token', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);

      const result = await verifyEmail('invalid-token');

      expect(result.success).toBe(false);
      expect((result as any).error?.code).toBe(ErrorCodes.AUTH_INVALID_TOKEN);
      expect((result as any).error?.message_key).toBe('auth.invalid_token');
      expect((result as any).status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
