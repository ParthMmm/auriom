import axios from 'axios';

import type { AlbumInfoRoot } from '@utils/types/albumInfo';

import type { Context } from './../../server/trpc/context';
import { stripURI } from './../stripURI';

export const getAlbum = async (ctx: Context, uri: string) => {
  const album = await ctx.prisma.album.findUnique({
    where: {
      uri: uri,
    },
    include: {
      images: true,
    },
  });

  if (album) {
    return album;
  }

  console.log({ album });

  const id = stripURI(uri);

  console.log(id, ctx.spotifyToken);

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

    const data = res.data as AlbumInfoRoot;

    return data;
  }
  return null;
};
