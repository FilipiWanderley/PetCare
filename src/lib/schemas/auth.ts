import { z } from 'zod';
import { ERROR_CATALOG } from '@/lib/errors';

export const RegisterSchema = z.object({
  name: z.string().min(2, ERROR_CATALOG.VALIDATION_NAME_TOO_SHORT.message),
  email: z.string().email(ERROR_CATALOG.VALIDATION_EMAIL_INVALID.message),
  password: z
    .string()
    .min(8, ERROR_CATALOG.VALIDATION_PASSWORD_TOO_SHORT.message)
    .regex(/[A-Z]/, ERROR_CATALOG.VALIDATION_PASSWORD_UPPERCASE.message)
    .regex(/[a-z]/, ERROR_CATALOG.VALIDATION_PASSWORD_LOWERCASE.message)
    .regex(/[0-9]/, ERROR_CATALOG.VALIDATION_PASSWORD_NUMBER.message),
});

export const LoginSchema = z.object({
  email: z.string().email(ERROR_CATALOG.VALIDATION_EMAIL_INVALID.message),
  password: z.string().min(1, ERROR_CATALOG.VALIDATION_REQUIRED.message),
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
