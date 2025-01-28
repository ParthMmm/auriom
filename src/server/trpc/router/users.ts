import { z } from 'zod';

import { userSchema } from '@utils/schemas/userSchema';

import { protectedProcedure, publicProcedure, router } from '../trpc';

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log(ctx.user.username);
      const { username } = ctx.user;

      const user = await ctx.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }),

  updateUser: protectedProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        username,
        bio,
        spotifyAccount,
        lastFmAccount,
        soundCloudAccount,
        twitterAccount,
      } = input;

      if (ctx.user.username !== username) {
        throw new Error('You can only update your own profile');
      }

      const userId = ctx?.user?.id;

      const user = await ctx.prisma.user.update({
        where: {
          username: username,
        },
        data: {
          bio: bio,
          spotifyAccount: spotifyAccount,
          lastFmAccount: lastFmAccount,
          soundCloudAccount: soundCloudAccount,
          twitterAccount: twitterAccount,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }),

  followUser: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { username } = input;

      const userId = ctx?.user?.id;

      const user = await ctx.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const follow = await ctx.prisma.follows.create({
        data: {
          followerId: userId,
          followingId: user.id,
        },
      });

      return follow;
    }),

  unfollowUser: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { username } = input;

      const userId = ctx?.user?.id;

      const user = await ctx.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const follow = await ctx.prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: user.id,
          },
        },
      });

      return follow;
    }),

  getFollowInfo: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const { username } = input;

      const userId = ctx?.user?.id;

      const user = await ctx.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const follow = await ctx.prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: user.id,
          },
        },
      });

      return follow;
    }),

  getFollowCounts: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const { username } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const followers = await ctx.prisma.follows.count({
        where: {
          followingId: user.id,
        },
      });

      const following = await ctx.prisma.follows.count({
        where: {
          followerId: user.id,
        },
      });

      return { followers, following };
    }),
});
