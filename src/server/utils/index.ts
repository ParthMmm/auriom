import type { Context } from "./../trpc/context";
import type { AlbumTracksItem } from "./../../utils/types/albumTracks";
import { getAlbum } from "@utils/queries/getAlbum";
import { stripURI } from "@utils/stripURI";
import type { AlbumInfoRoot, Artist, Image } from "@utils/types/albumInfo";

// function to take spotify uri, call spotify api, get data and add album, artist, and tracks to db
export const addAlbumToDb = async (ctx: Context, uri: string) => {
  const albumExists = await ctx.prisma.album.findUnique({
    where: {
      uri: uri,
    },
    include: {
      images: true,
    },
  });

  if (albumExists) {
    return;
  }

  const album = (await getAlbum(ctx, uri)) as AlbumInfoRoot;

  if (!album) {
    return;
  }

  const albumData = album;

  const albumTitle = albumData.name;

  const albumArtist = albumData.artists;

  const albumImages = albumData.images;

  const albumTracks = albumData.tracks.items;

  const albumUri = albumData.uri;

  const albumId = albumData.id;

  // add album to db
  const newAlbum = await ctx.prisma.album.create({
    data: {
      uri: albumUri,
      title: albumTitle,
      id: albumId,
    },
  });

  // add artist to db
  await artistHelper(ctx, albumArtist, uri);

  // add images to db
  await imageHelper(ctx, albumImages, uri);

  // add tracks to db
  await trackHelper(ctx, albumTracks, uri);

  return newAlbum;
};
// function to add artist to db
export const artistHelper = async (
  ctx: Context,
  artists: Artist[],
  uri: string
) => {
  return artists.forEach(async (artist: Artist) => {
    const artistId = stripURI(uri);

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
              uri: uri,
            },
          },
        },
      });
    }

    if (!artistExists) {
      await ctx.prisma.artist.create({
        data: {
          id: artistId,
          uri: artist.uri,
          name: artist.name,
          albums: {
            connect: {
              uri: uri,
            },
          },
        },
      });
    }
  });
};

export const trackHelper = async (
  ctx: Context,
  tracks: AlbumTracksItem[],
  uri: string
) => {
  return tracks.forEach(async (track: AlbumTracksItem) => {
    const trackId = stripURI(track.uri);

    if (!trackId) return;

    const trackExists = await ctx.prisma.track.findUnique({
      where: {
        uri: track.uri,
      },
    });

    if (!trackExists) {
      await ctx.prisma.track.create({
        data: {
          id: trackId,
          uri: track.uri,
          title: track.name,
          trackNum: track.track_number,
          duration: track.duration_ms,
          previewUrl: track.preview_url,
          album: {
            connect: {
              uri: uri,
            },
          },
          artists: {
            connectOrCreate: track.artists.map((artist) => {
              return {
                where: {
                  uri: artist.uri,
                },
                create: {
                  id: artist.id,
                  uri: artist.uri,
                  name: artist.name,
                },
              };
            }),
          },
        },
      });
    }
  });
};

export const imageHelper = async (
  ctx: Context,
  images: Image[],
  uri: string
) => {
  return images.map(async (image: Image) => {
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
              uri: uri,
            },
          },
        },
      });
    }
  });
};
