import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { reviewSchema } from "../../../utils/schemas/review";
import { addAlbumToDb } from "src/server/utils";

export const reviewRouter = router({
  createReview: protectedProcedure
    .input(reviewSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        uri,
        userId,
        rating,
        body,
        // favoriteTracks,
      } = input;

      if (ctx.user.id) {
        console.log(ctx.user);

        await addAlbumToDb(ctx, uri);

        //create review and connect to user and album
        const review = await ctx.prisma.review.create({
          data: {
            Album: {
              connect: {
                uri: uri,
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
      }
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
