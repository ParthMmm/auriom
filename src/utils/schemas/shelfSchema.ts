import { z } from 'zod';

export const createShelfSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Shelf name is required',
    })
    .max(100, {
      message: 'Shelf name must be less than 100 characters',
    }),
  userId: z.string(),
});

export const addToShelfSchema = z.object({
  shelfId: z.string(),
  spotifyId: z.string(),
  userId: z.string(),
});

export type createShelfType = z.infer<typeof createShelfSchema>;
