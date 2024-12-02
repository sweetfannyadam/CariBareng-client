import { z } from 'zod';

export const editProfileFormSchema = z.object({
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
});

export const uploadProfilePictureFormSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < 7000000, {
    message: 'Your profilePicture must be less than 7MB.',
  }),
});
