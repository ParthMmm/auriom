import axios from 'axios';
import { z } from 'zod';

import { getSearchSchema } from '@utils/schemas/searchSchema';
// import { getHTTPStatusCodeFromError } from "@trpc/server/http";
// import type { TRPCError } from "@trpc/server";
import { stripURI } from '@utils/stripURI';
import type { AlbumInfoRoot } from '@utils/types/albumInfo';
import type { TracksRoot } from '@utils/types/albumTracks';
import type { Root } from '@utils/types/spotify';

import * as trpc from '../trpc';
import { getAlbumTracksSchema } from './../../../utils/schemas/searchSchema';

// const error: TRPCError = {
//   name: "TRPCError",
//   code: "UNAUTHORIZED",
//   message: '"spotify auth broken',
// };

export const spotifyRouter = trpc.router({
  //public procedure to search for item with spotify web api based on input
  albumSearch: trpc.publicProcedure
    .input(getSearchSchema)
    .query(async ({ input, ctx }) => {
      const { query, type, cursor } = input;

      // console.log(ctx);

      if (ctx.spotifyToken) {
        const token = ctx.spotifyToken.access_token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const offset = cursor ? cursor : 0;

        const res = await axios.get(
          `https://api.spotify.com/v1/search?q=${query}&type=${type}&offset=${offset}`,
          config,
        );

        const data: Pick<Root, 'albums'> = res.data;

        return data.albums;
      }
      return { offset: 0, items: [], total: 0, limit: 0 };
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

        const res = await axios.get(
          `https://api.spotify.com/v1/search?q=${query}&type=${type}&offset=${offset}`,
          config,
        );

        const data: Pick<Root, 'artists'> = res.data;

        return data.artists;
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

        const res = await axios.get(
          `https://api.spotify.com/v1/search?q=${query}&type=${type}&offset=${offset}`,
          config,
        );

        const data: Pick<Root, 'tracks'> = res.data;

        return data.tracks;
      }
      return { offset: 0, items: [], total: 0, limit: 0 };
    }),

  getAlbum: trpc.publicProcedure
    .input(getAlbumTracksSchema)
    .query(async ({ input, ctx }) => {
      const { uri } = input;

      const re = new RegExp(':([^:]*)$');

      const id3 = uri.match(re);
      // const id3 = id2[0].match(re);

      if (!id3) {
        return null;
      }

      const id = id3[1];

      if (ctx.spotifyToken) {
        const token = ctx.spotifyToken.access_token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(
          `https://api.spotify.com/v1/albums/${id}`,
          config,
        );

        const data: AlbumInfoRoot = res.data;

        return data;
      }
      // return { offset: 0, items: [], total: 0, limit: 0 };
    }),

  albumTracks: trpc.publicProcedure
    .input(getAlbumTracksSchema)
    .query(async ({ input, ctx }) => {
      const { uri } = input;

      const id = stripURI(uri);

      // if (!id) {
      //   return { offset: 0, items: [], total: 0, limit: 0 };
      // }

      // const id = id3[1];

      if (ctx.spotifyToken && id) {
        const token = ctx.spotifyToken.access_token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(
          `https://api.spotify.com/v1/albums/${id}/tracks?limit=50`,
          config,
        );

        const data: TracksRoot = res.data;

        return data;
      }
      return { offset: 0, items: [], total: 0, limit: 0 };
    }),
  getMultipleAlbumImages: trpc.publicProcedure
    .input(z.object({ uri: z.string() }))
    .query(async ({ input, ctx }) => {
      if (ctx.spotifyToken) {
        const token = ctx.spotifyToken.access_token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(
          `https://api.spotify.com/v1/albums/${input.uri}/tracks?limit=50`,
          config,
        );

        const data: TracksRoot = res.data;

        return data;
      }
    }),
});
