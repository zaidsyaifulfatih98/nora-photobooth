import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(5, 'First name must be at least 5 characters')
    .max(25, 'First name must be at most 25 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(5, 'Last name must be at least 5 characters')
    .max(25, 'Last name must be at most 25 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  role: z.enum(['SUPER_ADMIN', 'CASHIER'], {
    error: 'Please select a valid role',
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
