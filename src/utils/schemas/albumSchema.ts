import * as z from "zod";

export const getAlbumInfoSchema = z.object({
  album: z.string(),
  artist: z.string(),
  mbid: z.string().optional(),
});

export const getAlbumSearchSchema = z.object({
  query: z.string(),
});

export type IFetchAlbumInfo = z.infer<typeof getAlbumInfoSchema>;
export type IFetchAlbumSearch = z.infer<typeof getAlbumSearchSchema>;
