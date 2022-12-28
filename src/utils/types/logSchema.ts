import * as z from "zod";

export const logSchema = z.object({
  mbid: z.string().optional(),
  artist: z.string(),
  album: z.string(),
  user_id: z.string(),
  action: z.string(),
});

export const getLogSchema = z.object({
  artist: z.string(),
  album: z.string(),
  user_id: z.string(),
});

export const getLogUserSchema = z.object({
  username: z.string(),
});

export type ILogSchema = z.infer<typeof logSchema>;
