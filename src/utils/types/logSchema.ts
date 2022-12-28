import * as z from "zod";

export const logSchema = z.object({
  mbid: z.string().optional(),
  artist: z.string(),
  album: z.string(),
  userID: z.string(),
});
