import axios from 'axios';

import type { AlbumInfoRoot } from '@utils/types/spotify/albumInfo';

import type { Context } from './../../server/trpc/context';

export const getAlbum = async (ctx: Context, spotifyId: string) => {
  const album = await ctx.prisma.album.findUnique({
    where: {
      spotifyId: spotifyId,
    },
    include: {
      images: true,
    },
  });

  if (album) {
    return album;
  }

  if (ctx.spotifyToken) {
    const token = ctx.spotifyToken.access_token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `https://api.spotify.com/v1/albums/${spotifyId}`,
      config
    );

    const data = res.data as AlbumInfoRoot;

    return data;
  }
  return null;
};
