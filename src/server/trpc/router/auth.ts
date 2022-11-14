import { signUpSchema } from "./../../../pages/api/auth/auth";
import { router, publicProcedure } from "../trpc";

export const authRouter = router({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      // const uniqueEmail = await ctx.prisma.user.findUnique({
      //   where: {
      //     email: input.email,
      //   },
      // });

      const uniqueUsername = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
      });

      if (!uniqueUsername) {
        return {
          error: "username already in use",
        };
      }

      console.log(uniqueUsername);

      const user = await ctx.prisma.user.create({
        data: {
          // email: input.email,
          username: input.username,
          password: input.password,
        },
      });
      return user;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});
