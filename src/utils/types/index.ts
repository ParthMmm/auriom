import type { Album, Artist, Image } from '@prisma/client';

export type AlbumInfo = Album & {
  artists: Artist | Artist[];
} & {
  images: Image[];
};

// export tyep

export type ArtistInfo = Artist;
