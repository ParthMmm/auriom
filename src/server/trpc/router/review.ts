import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { reviewSchema } from "../schemas/review";

export const reviewRouter = router({
  createReview: publicProcedure
    .input(reviewSchema)
    .mutation(async ({ input, ctx }) => {
      const { uri, artist, title, userId, rating, body } = input;

      if (ctx.user.id) {
        //create review and connect to user and album
        const review = await ctx.prisma.review.create({
          data: {
            Album: {
              connectOrCreate: {
                where: {
                  uri: uri,
                },
                create: {
                  uri: uri,
                  artist: artist,
                  title: title,
                },
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
        },
      });

      return reviews;
    }),
});
