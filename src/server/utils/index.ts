import { getAlbum } from '@utils/queries/getAlbum';
import { getAlbumTracklist } from '@utils/queries/getAlbumTracklist';
import { stripURI } from '@utils/stripURI';
import type {
  AlbumInfoRoot,
  Artist,
  Image,
} from '@utils/types/spotify/albumInfo';

import type {
  AlbumTracksItem,
  TracksRoot,
} from './../../utils/types/spotify/albumTracks';
import type { Context } from './../trpc/context';

// function to take spotify uri, call spotify api, get data and add album, artist, and tracks to db
export const addAlbumToDb = async (ctx: Context, spotifyId: string) => {
  const albumExists = await ctx.prisma.album.findUnique({
    where: {
      spotifyId: spotifyId,
    },
    include: {
      images: true,
    },
  });

  if (albumExists) {
    return;
  }

  const album = (await getAlbum(ctx, spotifyId)) as AlbumInfoRoot;
  const tracklist = (await getAlbumTracklist(ctx, spotifyId)) as TracksRoot;

  if (!album) {
    return;
  }

  const albumData = album;

  const albumTitle = albumData.name;

  const albumArtist = albumData.artists;

  const albumImages = albumData.images;

  const albumTracks = tracklist.items;

  const albumUri = albumData.uri;

  const albumId = albumData.id;

  // add album to db
  const newAlbum = await ctx.prisma.album.create({
    data: {
      uri: albumUri,
      title: albumTitle,
      spotifyId: albumId,
    },
  });

  const albumSpotifyId = albumId;

  if (newAlbum && albumSpotifyId) {
    // add artist to db
    await artistHelper(ctx, albumArtist, albumSpotifyId).then(() => {
      // add images to db
      imageHelper(ctx, albumImages, albumSpotifyId).then(() => {
        // add tracks to db
        trackHelper(ctx, albumTracks, albumId).then(() => newAlbum);
      });
    });
  }

  return null;
};
// function to add artist to db
export const artistHelper = async (
  ctx: Context,
  artists: Artist[],
  albumSpotifyId: string
) =>
  artists.forEach(async (artist: Artist) => {
    const artistId = stripURI(artist.uri);

    const id = artist.uri.split(':')[2];

    if (!artistId) return;

    const artistExists = await ctx.prisma.artist.findUnique({
      where: {
        uri: artist.uri,
      },
    });

    if (artistExists) {
      await ctx.prisma.artist.update({
        where: {
          uri: artist.uri,
        },
        data: {
          albums: {
            connect: {
              spotifyId: albumSpotifyId,
            },
          },
        },
      });
    }

    if (!artistExists) {
      await ctx.prisma.artist.create({
        data: {
          spotifyId: artistId,
          uri: artist.uri,
          name: artist.name,
          albums: {
            connect: {
              spotifyId: albumSpotifyId,
            },
          },
        },
      });
    }
  });

export const trackHelper = async (
  ctx: Context,
  tracks: AlbumTracksItem[],
  id: string
) =>
  tracks.forEach(async (track: AlbumTracksItem) => {
    const trackId = stripURI(track.uri);

    if (!trackId) return;

    const trackExists = await ctx.prisma.track.findUnique({
      where: {
        spotifyId: trackId,
      },
    });

    // create tracks and connect to album
    // create artists then connect to tracks
    if (!trackExists) {
      const a = await ctx.prisma.track.create({
        data: {
          uri: track.uri,
          spotifyId: trackId,
          title: track.name,
          trackNum: track.track_number,
          duration: track.duration_ms,
          previewUrl: track.preview_url,
          album: {
            connect: {
              spotifyId: id,
            },
          },
        },
      });

      //create artists for each track
      const artists = await ctx.prisma.artist.createMany({
        data: track.artists.map((artist) => ({
          spotifyId: artist.id,
          uri: artist.uri,
          name: artist.name,
        })),
        skipDuplicates: true,
      });

      const tracks = await ctx.prisma.track.update({
        where: {
          id: a.id,
        },
        data: {
          artists: {
            connect: track.artists.map((artist) => ({
              uri: artist.uri,
            })),
          },
        },
      });

      return tracks;
    }
  });

export const imageHelper = async (
  ctx: Context,
  images: Image[],
  albumSpotifyId: string
) =>
  images.map(async (image: Image) => {
    const imageExists = await ctx.prisma.image.findFirst({
      where: {
        url: image.url,
      },
    });

    if (!imageExists) {
      await ctx.prisma.image.create({
        data: {
          height: image.height,
          width: image.width,
          url: image.url,

          album: {
            connect: {
              spotifyId: albumSpotifyId,
            },
          },
        },
      });
    }
  });
