import { z } from "zod";

export const userInputReviewSchema = z.object({
  // rating: z.number().min(1).max(5),
  body: z.string().min(0).max(1000),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  body: z.string().min(0).max(1000),
  uri: z.string(),
  title: z.string(),
  artist: z.string(),
  userId: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;
export type UserInputReview = z.infer<typeof userInputReviewSchema>;
