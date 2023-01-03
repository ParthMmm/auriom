import * as z from "zod";

export const logSchema = z.object({
  uri: z.string(),
  artist: z.string(),
  title: z.string(),
  user_id: z.string(),
  action: z.string(),
  images: z.array(
    z.object({
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
  ),
});

export const getLogSchema = z.object({
  uri: z.string(),
  user_id: z.string(),
});

export const getLogUserSchema = z.object({
  username: z.string(),
});

export type ILogSchema = z.infer<typeof logSchema>;
