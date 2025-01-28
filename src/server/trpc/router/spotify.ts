import { TRPCError } from '@trpc/server';
import { ofetch } from 'ofetch';
import { z } from 'zod';

import { getSearchSchema } from '@utils/schemas/searchSchema';
import type { AlbumInfoRoot } from '@utils/types/spotify/albumInfo';
import type { TracksRoot } from '@utils/types/spotify/albumTracks';
import type { Albums, Root } from '@utils/types/spotify/spotify';

import * as trpc from '../trpc';
import { getAlbumTracklist } from './../../../utils/queries/getAlbumTracklist';
import { getAlbumTracksSchema } from './../../../utils/schemas/searchSchema';

export const spotifyRouter = trpc.router({
  //public procedure to search for item with spotify web api based on input
  albumSearch: trpc.publicProcedure
    .input(getSearchSchema)
    .query(async ({ input, ctx }) => {
      const { query, type, cursor } = input;

      if (!ctx.spotifyToken) {
        return { offset: 0, items: [], total: 0, limit: 0 };
      }

      const token = ctx.spotifyToken.access_token;
      const offset = cursor ? cursor : 0;

      const data = await ofetch<Pick<Root, 'albums'>>(
        'https://api.spotify.com/v1/search',
        {
          query: {
            q: query,
            type,
            offset,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data.albums;
    }),

  artistSearch: trpc.publicProcedure
    .input(getSearchSchema)
    .query(async ({ input, ctx }) => {
      const { query, type, cursor } = input;

      if (ctx.spotifyToken) {
        const token = ctx.spotifyToken.access_token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const offset = cursor ? cursor : 0;

        const res = await ofetch<Pick<Root, 'artists'>>(
          `https://api.spotify.com/v1/search?q=${query}&type=${type}&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return res.artists;
      }
      return { offset: 0, items: [], total: 0, limit: 0 };
    }),

  trackSearch: trpc.publicProcedure
    .input(getSearchSchema)
    .query(async ({ input, ctx }) => {
      const { query, type, cursor } = input;

      if (ctx.spotifyToken) {
        const token = ctx.spotifyToken.access_token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const offset = cursor ? cursor : 0;

        const res = await ofetch<Pick<Root, 'tracks'>>(
          `https://api.spotify.com/v1/search?q=${query}&type=${type}&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return res.tracks;
      }
      return { offset: 0, items: [], total: 0, limit: 0 };
    }),

  getAlbum: trpc.publicProcedure
    .input(getAlbumTracksSchema)
    .query(async ({ input, ctx }) => {
      const { spotifyId } = input;

      if (ctx.spotifyToken) {
        const token = ctx.spotifyToken.access_token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await ofetch<AlbumInfoRoot>(
          `https://api.spotify.com/v1/albums/${spotifyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return res;
      }
    }),

  getAlbumTracklist: trpc.publicProcedure
    .input(getAlbumTracksSchema)
    .query(async ({ input, ctx }) => {
      const { spotifyId } = input;

      const tracklist = await getAlbumTracklist(ctx, spotifyId);

      return tracklist;
    }),

  getMultipleAlbumImages: trpc.publicProcedure
    .input(z.object({ uri: z.string() }))
    .query(async ({ input, ctx }) => {
      if (!ctx.spotifyToken) {
        return null;
      }

      const token = ctx.spotifyToken.access_token;

      const data = await ofetch<TracksRoot>(
        `https://api.spotify.com/v1/albums/${input.uri}/tracks`,
        {
          query: {
            limit: 50,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    }),

  getNewReleases: trpc.publicProcedure.query(async ({ ctx }) => {
    if (!ctx.spotifyToken) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'No Spotify token available',
      });
    }

    const token = ctx.spotifyToken.access_token;

    try {
      const response = await ofetch<{ albums: Albums }>(
        'https://api.spotify.com/v1/browse/new-releases',
        {
          query: {
            limit: 50,
            country: 'US',
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response || !response.albums) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Invalid response from Spotify API',
        });
      }

      const parsed = newReleasesSchema.safeParse(response.albums);
      if (!parsed.success) {
        console.error('Schema validation error:', parsed.error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Invalid data structure from Spotify API',
        });
      }

      return parsed.data;
    } catch (error) {
      console.error('Error fetching new releases:', error);
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch new releases from Spotify',
      });
    }
  }),
});

export const newReleasesSchema = z.object({
  href: z.string(),
  limit: z.number(),
  next: z.string().nullable(),
  offset: z.number(),
  previous: z.string().nullable(),
  total: z.number(),
  items: z.array(
    z.object({
      album_type: z.string(),
      total_tracks: z.number(),
      available_markets: z.array(z.string()),
      external_urls: z.object({ spotify: z.string() }),
      href: z.string(),
      id: z.string(),
      images: z.array(
        z.object({
          height: z.number(),
          url: z.string(),
          width: z.number(),
        })
      ),
      name: z.string(),
      release_date: z.string(),
      release_date_precision: z.string(),
      type: z.string(),
      uri: z.string(),
      artists: z.array(
        z.object({
          external_urls: z.object({ spotify: z.string() }),
          href: z.string(),
          id: z.string(),
          name: z.string(),
          type: z.string(),
          uri: z.string(),
        })
      ),
    })
  ),
});
