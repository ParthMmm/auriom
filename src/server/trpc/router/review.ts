import { addAlbumToDb } from 'src/server/utils';
import { z } from 'zod';

import { reviewSchema } from '../../../utils/schemas/review';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const reviewRouter = router({
  createReview: protectedProcedure
    .input(reviewSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        spotifyId,
        userId,
        rating,
        body,
        // favoriteTracks,
      } = input;

      await addAlbumToDb(ctx, spotifyId);

      //create review and connect to user and album
      const review = await ctx.prisma.review.create({
        data: {
          Album: {
            connect: {
              spotifyId: spotifyId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          rating: rating,
          body: body,
        },
      });

      return review;
    }),
  getReviewsForAlbum: publicProcedure
    .input(z.object({ uri: z.string() }))
    .query(async ({ input, ctx }) => {
      const { uri } = input;

      const reviews = await ctx.prisma.review.findMany({
        where: {
          Album: {
            uri: uri,
          },
        },
        include: {
          user: true,
          Album: true,
        },
      });

      return reviews;
    }),

  getReviewsForUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input, ctx }) => {
      const { username } = input;

      const reviews = await ctx.prisma.review.findMany({
        where: {
          user: {
            username: username,
          },
        },
        include: {
          Album: {
            include: {
              images: true,
            },
          },
        },
      });

      return reviews;
    }),
});
