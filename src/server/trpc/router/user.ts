import { z } from 'zod';

import { userSchema } from '@utils/schemas/userSchema';

import { protectedProcedure, publicProcedure, router } from '../trpc';

export const userRouter = router({
  getUser: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const { username } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          username: username,
        },
        include: {
          externalAccounts: true,
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
      const { username, bio } = input;

      if (ctx.user.username !== username) {
        throw new Error('You can only update your own profile');
      }

      const user = await ctx.prisma.user.update({
        where: {
          username: username,
        },
        data: {
          bio: bio,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }),
});
