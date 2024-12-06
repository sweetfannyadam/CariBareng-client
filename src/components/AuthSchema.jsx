import { z } from 'zod';

const signUpFormSchema = z
  .object({
    fullname: z
      .string({
        required_error: 'Fullname is required.',
        message: 'Fullname should only contain letters and spaces.',
      })
      .min(3, {
        message: 'Fullname should be at least 3 characters long.',
      })
      .max(15, {
        message: 'Fullname should not exceed 15 characters.',
      }),
    username: z
      .string({
        required_error: 'Username is required.',
        message: 'Username should be at least 3 characters long.',
      })
      .min(3, {
        message: 'Username should be at least 3 characters long.',
      })
      .max(15, {
        message: 'Username should not exceed 15 characters.',
      }),
    gmail: z
      .string({
        required_error: 'Email is required.',
        message: 'Email should be a valid email.',
      })
      .email({
        message: 'Please enter a valid email address (e.g., name@example.com).',
      }),
    no_hp: z
      .string({
        required_error: 'Phone number is required.',
        message: 'Please enter a valid phone number.',
      })
      .min(10, {
        message: 'Please enter a valid phone number.',
      })
      .max(15, {
        message: 'Please enter a valid phone number.',
      }),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .min(8, { message: 'Password should be at least 8 characters long.' })
      .max(15, { message: 'maximum password should be less than 15 characters' })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Password should contain at least one uppercase letter.',
      })
      .refine((value) => /[a-z]/.test(value), {
        message: 'Password should contain at least one lowercase letter.',
      })
      .refine((value) => /\d/.test(value), {
        message: 'Password should contain at least one number.',
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: 'Password should contain at least one special character.',
      }),
    confirm_password: z
      .string({
        required_error: 'Please confirm your password.',
      })
      .min(8, {
        message: 'Please confirm your password.',
      }),
  })
  .refine(
    (value) => {
      return value.password === value.confirm_password;
    },
    {
      message: "Passwords don't match. Please try again.",
      path: ['confirm_password'],
    }
  );

const loginFormSchema = z.object({
  username: z
    .string({
      required_error: 'Please enter your username.',
    })
    .min(3, {
      message: 'Username should be at least 3 characters long.',
    })
    .max(15, {
      message: 'Username should not exceed 15 characters.',
    }),
  password: z
    .string({
      required_error: 'Please enter your password.',
      message: 'Username should be at least 8 characters long.',
    })
    .min(8, {
      message: 'Password should be at least 8 characters long.',
    })
    .max(15, {
      message: 'Password should not exceed 15 characters.',
    }),
});

export { signUpFormSchema, loginFormSchema };
