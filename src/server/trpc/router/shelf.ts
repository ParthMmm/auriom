import {
  addToShelfSchema,
  createShelfSchema,
} from '@utils/schemas/shelfSchema';
import { addAlbumToDb } from 'src/server/utils';
import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from '../trpc';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { TRPCError } from '@trpc/server';

export const shelfRouter = router({
  createShelf: protectedProcedure
    .input(createShelfSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, userId } = input;

      try {
        const shelf = await ctx.prisma.shelf.create({
          data: {
            name: name,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return shelf;
      } catch (err) {
        throw new Error(
          'Shelf already exists. Shelves must have unique names.',
        );
      }
    }),
  addAlbumToShelf: protectedProcedure
    .input(addToShelfSchema)
    .mutation(async ({ input, ctx }) => {
      const { shelfId, spotifyId, userId } = input;

      //check if user owns shelf
      const currShelf = await ctx.prisma.shelf.findUnique({
        where: {
          id: shelfId,
        },
        select: {
          userId: true,
        },
      });

      if (currShelf?.userId !== userId) {
        // throw new TRPCError({

        throw new Error('User does not own shelf');
      }

      await addAlbumToDb(ctx, spotifyId);

      //check if album already in shelf
      const currAlbum = await ctx.prisma.shelf.findUnique({
        where: {
          id: shelfId,
        },
        select: {
          albums: {
            where: {
              spotifyId: spotifyId,
            },
          },
        },
      });

      if (currAlbum?.albums[0]) {
        throw new Error('Album already exists in shelf');
      }

      try {
        const shelf = await ctx.prisma.shelf.update({
          where: {
            id: shelfId,
          },
          data: {
            albums: {
              connect: {
                spotifyId: spotifyId,
              },
            },
          },
        });

        return shelf;
      } catch (err) {
        throw new Error('Error adding album to shelf');
      }
    }),

  getShelves: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { userId } = input;

      const shelves = await ctx.prisma.shelf.findMany({
        where: {
          userId: userId,
        },
        include: {
          albums: true,
        },
      });

      return shelves;
    }),

  getShelvesForUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input, ctx }) => {
      const { username } = input;

      const shelves = await ctx.prisma.shelf.findMany({
        where: {
          user: {
            username: username,
          },
        },
        include: {
          albums: {
            include: {
              images: true,
              artists: true,
            },
          },
        },
      });

      if (!shelves) {
        throw new Error('User not found');
      }

      // console.log(user.shelves);

      return shelves;
    }),
});
