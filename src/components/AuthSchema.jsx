import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const signUpFormSchema = z.object({
  name: z
    .string({
      message: 'Name should only contain letters and spaces.',
    })
    .min(3, {
      message: 'Name should be at least 3 characters long.',
    })
    .max(15, {
      message: 'Name should not exceed 15 characters.',
    }),
  username: z
    .string({
      message: 'Username should be at least 3 characters long.',
    })
    .min(3, {
      message: 'Username should be at least 3 characters long.',
    })
    .max(15, {
      message: 'Username should not exceed 15 characters.',
    }),
  email: z
    .string({
      message: 'Email should be a valid email.',
    })
    .email({
      message: 'Please enter a valid email address (e.g., name@example.com).',
    }),
  password: z
    .string({
      message: 'Password should be at least 8 characters long.',
    })
    .min(8, {
      message: 'Password should be at least 8 characters long.',
    })
    .refine(
      (value) =>
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        /[0-9]/.test(value),
      {
        message:
          'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      }
    ),
  confirmPassword: z
    .string({
      message: 'Please confirm your password.',
    })
    .min(8, {
      message: 'Please confirm your password.',
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: "Passwords don't match. Please try again.",
      path: ['confirmPassword'],
    }),
});

const loginFormSchema = z.object({
  username: z
    .string({
      message: 'Please enter your username or email.',
    })
    .min(3, {
      message: 'Username should be at least 3 characters long.',
    })
    .max(15, {
      message: 'Username should not exceed 15 characters.',
    }),
  password: z
    .string({
      message: 'Username should be at least 8 characters long.',
    })
    .min(8, {
      message: 'Password should be at least 8 characters long.',
    })
    .max(15, {
      message: 'Password should not exceed 15 characters.',
    }),
});

export default { signUpFormSchema, loginFormSchema };
