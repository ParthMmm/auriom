import { z } from 'zod';

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
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }),
});
