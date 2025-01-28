import type { TracksRoot } from '@utils/types/spotify/albumTracks';
import axios from 'axios';

import type { Context } from './../../server/trpc/context';

export const getAlbumTracklist = async (ctx: Context, id: string) => {
  if (ctx.spotifyToken && id) {
    const token = ctx.spotifyToken.access_token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `https://api.spotify.com/v1/albums/${id}/tracks?limit=50`,
      config
    );

    const data = res.data as TracksRoot;

    return data;
  }
  return null;
};
