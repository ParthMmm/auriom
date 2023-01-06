import type { User } from "@prisma/client";

export type Review = {
  id: number;
  rating: number;
  body: string;
  createdAt: Date;
  albumId: number;
  userId: number;
};

export type UserInputReview = {
  rating: number;
  body: string;
  uri: string;
  title: string;
  artist: string;
  userId: string;
};

export type ReviewWithUser = Review & {
  user: User;
};

export type ReviewWithUserWithAlbum = ReviewWithUser & {
  Album: {
    uri: string;
    title: string;
    artist: string;
  };
};
