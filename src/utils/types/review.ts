import type { Album, Artist, Image, Review, User } from '@prisma/client';

import { AlbumInfo } from '@utils/types';

import type { ArtistInfo } from './index';

export type UserInputReview = {
  rating: number;
  body: string;
  uri: string;
  title: string;
  artist: string;
  userId: string;
};

export type ReviewWithUserWithAlbum = Review & { user: User; Album: Album };

export type ReviewWithEverything = Review & {
  user: User;
  Album: Album & { images: Image[]; artists: Artist[] };
};
