import { z } from 'zod';

export const addMissingItemFormSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required.',
      message: 'Title should be at least 3 characters long.',
    })
    .min(3, {
      message: 'Title should be at least 3 characters long.',
    })
    .max(15, {
      message: 'Title should not exceed 15 characters.',
    }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  date_time: z.date({
    required_error: 'Date and time are required.',
    message: 'Please enter a valid date and time.',
  }),
  last_viewed: z.string({
    required_error: 'Last viewed location is required.',
  }),
  description: z
    .string({
      required_error: 'Description is required.',
      message: 'Description should be at least 3 characters long.',
    })
    .min(3, {
      message: 'Description should be at least 3 characters long.',
    })
    .max(100, {
      message: 'Description should not exceed 100 characters.',
    }),
  contact: z.string({
    required_error: 'Contact is required.',
    message: 'Please enter a valid contact number.',
  }),
  reward: z
    .string({
      required_error: 'Reward is required.',
      message: 'Reward should be at least 3 characters long.',
    })
    .min(3, {
      message: 'Reward should be at least 3 characters long.',
    })
    .max(15, {
      message: 'Reward should not exceed 15 characters.',
    }),
  image: z
    .array(z.any())
    .min(1, { message: 'Please upload at least 1 image.' })
    .max(3, { message: 'You can upload a maximum of 3 images.' }),
  location: z.object({
    lat: z
      .string({
        required_error: 'Location is required.',
      })
      .min(3, {
        message: 'Location should be at least 3 characters long.',
      })
      .max(15, {
        message: 'Location should not exceed 15 characters.',
      }),
    lng: z
      .string({
        required_error: 'Location is required.',
      })
      .min(3, {
        message: 'Location should be at least 3 characters long.',
      })
      .max(15, {
        message: 'Location should not exceed 15 characters.',
      }),
  }),
});
