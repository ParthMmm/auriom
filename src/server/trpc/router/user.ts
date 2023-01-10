import { z } from 'zod';

import { userSchema } from '@utils/schemas/userSchema';

import { protectedProcedure, publicProcedure, router } from '../trpc';
import { ExternalAccount } from './../../../utils/types/user';

export const userRouter = router({
  getUser: protectedProcedure
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
});
