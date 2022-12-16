import * as z from "zod";

export const getAlbumInfoSchema = z.object({
  album: z.string(),
  artist: z.string(),
  mbid: z.string().optional(),
});

export const getAlbumSearchSchema = z.object({
  query: z.string(),
});

export const getArtistSearchSchema = z.object({
  query: z.string(),
});

export const getTrackSearchSchema = z.object({
  query: z.string(),
});

export type IFetchAlbumInfo = z.infer<typeof getAlbumInfoSchema>;
export type IFetchAlbumSearch = z.infer<typeof getAlbumSearchSchema>;
export type IFetchArtistSearch = z.infer<typeof getArtistSearchSchema>;
export type IFetchTrackSearch = z.infer<typeof getTrackSearchSchema>;
