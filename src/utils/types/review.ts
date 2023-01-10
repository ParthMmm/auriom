import type { Album, Artist, Review, User } from '@prisma/client';

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
