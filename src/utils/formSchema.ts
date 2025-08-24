import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().nonempty('Name is required'),
    age: z.number().min(18, 'You must be at least 18'),
    email: z.string().email('Invalid email').nonempty('Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Must contain at least 1 lowercase letter')
      .regex(/\d/, 'Must contain at least 1 number')
      .regex(/[!@#$%^&*]/, 'Must contain at least 1 special character'),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    terms: z.boolean().refine((val) => val === true, 'You must accept T&C'),
    avatar: z
      .any()
      .refine(
        (file) => !file || ['image/png', 'image/jpeg'].includes(file[0]?.type),
        'Only PNG/JPEG allowed'
      )
      .refine(
        (file) => !file || file[0]?.size <= 2 * 1024 * 1024,
        'Max size 2MB'
      ),
    country: z.string().nonempty('Country is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
