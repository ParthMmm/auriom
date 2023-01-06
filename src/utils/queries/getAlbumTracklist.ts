import axios from 'axios';

import { stripURI } from '@utils/stripURI';
import type { TracksRoot } from '@utils/types/albumTracks';

import type { Context } from './../../server/trpc/context';

export const getAlbumTracklist = async (ctx: Context, uri: string) => {
  const id = stripURI(uri);

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

    const data = res.data as TracksRoot;

    return data;
  }
  return null;
};
