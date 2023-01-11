import { addAlbumToDb } from 'src/server/utils';
import { z } from 'zod';

import { reviewSchema } from '../../../utils/schemas/review';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const reviewRouter = router({
  createReview: protectedProcedure
    .input(reviewSchema)
    .mutation(async ({ input, ctx }) => {
      const { spotifyId, userId, rating, body, favoriteTracks } = input;

      await addAlbumToDb(ctx, spotifyId);

      // find if user has already reviewed album
      const existingReview = await ctx.prisma.review.findFirst({
        where: {
          Album: {
            spotifyId: spotifyId,
          },
          user: {
            id: userId,
          },
        },
      });

      // if (existingReview) {
      //   throw new Error('You have already reviewed this album');
      // }

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

      // connect favorite tracks to review
      // if (favoriteTracks) {
      //   favoriteTracks.forEach(async (track) => {
      //     if (!track.id) {
      //       throw new Error('Track id is required');
      //     }

      //     console.log({ track });

      //     const res = await ctx.prisma.favoriteTrack.create({
      //       data: {
      //         // userId: userId,
      //         // trackId: track.id,
      //         // reviewId: review.id,

      //         track: {
      //           connect: {
      //             spotifyId: track.id,
      //           },
      //         },
      //         user: {
      //           connect: {
      //             id: userId,
      //           },
      //         },
      //         Review: {
      //           connect: {
      //             id: review.id,
      //           },
      //         },
      //       },
      //     });

      //     console.log(res);
      //   });
      // }

      return review;
    }),
  getReviewsForAlbum: publicProcedure
    .input(z.object({ spotifyId: z.string(), cursor: z.string().nullish() }))
    .query(async ({ input, ctx }) => {
      const { spotifyId, cursor } = input;

      console.log({ cursor });

      const reviews = await ctx.prisma.review.findMany({
        take: 5,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,

        orderBy: {
          createdAt: 'desc',
        },

        where: {
          Album: {
            spotifyId: spotifyId,
          },
        },
        include: {
          user: true,
          Album: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (reviews.length > 4) {
        const nextItem = reviews.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }
      // console.log(nextCursor);
      return {
        reviews,
        nextCursor,
      };

      // return reviews;
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
              artists: true,
            },
          },
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return reviews;
    }),
});
