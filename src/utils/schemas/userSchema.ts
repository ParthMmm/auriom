import z from 'zod';

export const userBioInputSchema = z.object({
  //   username: z.string(),
  bio: z.string().nullable(),
  spotifyAccount: z.string().nullable(),
  lastFmAccount: z.string().nullable(),
  soundCloudAccount: z.string().nullable(),
  twitterAccount: z.string().nullable(),
});

export const userSchema = z.object({
  username: z.string(),
  bio: z.string().nullable(),
  spotifyAccount: z.string().nullable(),
  lastFmAccount: z.string().nullable(),
  soundCloudAccount: z.string().nullable(),
  twitterAccount: z.string().nullable(),
});

export type userBioInputType = z.infer<typeof userBioInputSchema>;

export type userSchemaType = z.infer<typeof userSchema>;
