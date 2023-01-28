import type {
  Album,
  Artist,
  Image,
  Listened,
  Listening,
  WantToListen,
} from '@prisma/client';

export type AlbumInfo = Album & {
  artists: Artist | Artist[];
} & {
  images: Image[];
};

// export tyep

export type ArtistInfo = Artist;

export type Action = Listening | WantToListen | Listened;

export type ActionInfo = Action & {
  album: AlbumInfo;
};

export type ShelfInfo = Album & {
  images: Image[];
  artists: Artist | Artist[];
};
