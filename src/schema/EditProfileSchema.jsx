import { z } from 'zod';

export const editProfileFormSchema = z.object({
  fullname: z
    .string({
      required_error: 'Fullname is required.',
      message: 'Fullname should only contain letters and spaces.',
    })
    .min(3, {
      message: 'Fullname should be at least 3 characters long.',
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
  gender: z.string({
    message: 'Please enter a gender.',
  }),
  about_me: z
    .string({
      required_error: 'About me is required.',
    })
    .min(3, {
      message: 'About me should be at least 3 characters long.',
    })
    .max(100, {
      message: 'About me should not exceed 100 characters.',
    }),
});

export const uploadProfilePictureFormSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < 7000000, {
    message: 'Your profilePicture must be less than 7MB.',
  }),
});
