import { z } from 'zod';

export const userInputReviewSchema = z.object({
  // rating: z.number().min(1).max(5),
  body: z.string().min(0).max(10000),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  body: z.string().min(0).max(10000).optional(),
  uri: z.string(),
  userId: z.string(),

  favoriteTracks: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        duration_ms: z.number(),
        preview_url: z.string(),
        uri: z.string(),
        artists: z.array(
          z.object({
            uri: z.string(),
            id: z.string(),
            name: z.string(),
          }),
        ),
      }),
    )
    .optional(),
});

export const favoriteTracklistSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    duration_ms: z.number(),
    preview_url: z.string(),
    uri: z.string(),
    artists: z.array(
      z.object({
        uri: z.string(),
        id: z.string(),
        name: z.string(),
      }),
    ),
  }),
);

export type Review = z.infer<typeof reviewSchema>;
export type UserInputReview = z.infer<typeof userInputReviewSchema>;

// export type Images = z.infer<typeof reviewSchema>["images"];
export type FavoriteTracklist = z.infer<typeof reviewSchema>['favoriteTracks'];
