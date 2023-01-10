import z from 'zod';

export const userBioInputSchema = z.object({
  //   username: z.string(),
  bio: z.string().optional(),
  spotifyAccount: z.string().optional(),
  lastFmAccount: z.string().optional(),
  soundCloudAccount: z.string().optional(),
  twitterAccount: z.string().optional(),
});

export const userSchema = z.object({
  username: z.string(),
  bio: z.string().optional(),
  spotifyAccount: z.string().optional(),
  lastFmAccount: z.string().optional(),
  soundCloudAccount: z.string().optional(),
  twitterAccount: z.string().optional(),
});

export type userBioInputType = z.infer<typeof userBioInputSchema>;

export type userSchemaType = z.infer<typeof userSchema>;
