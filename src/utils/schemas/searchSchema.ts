import * as z from 'zod';

export const getSearchSchema = z.object({
  query: z.string(),
  type: z.string(),
  //   offset: z.number(),
  cursor: z.number().nullish(),
  //   limit: z.number(),
});

export const getAlbumTracksSchema = z.object({
  spotifyId: z.string(),
});
