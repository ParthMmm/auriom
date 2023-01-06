import { protectedProcedure, publicProcedure, router } from '../trpc';

export const authRouter = router({
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.user.findMany()),

  testAuth: publicProcedure.query(({ ctx }) => {
    if (ctx.user) {
      // return { greeting: `hello ${ctx.user?.username}` };
      return ctx.user;
    }

    return 'not signed in';
  }),

  testProtected: protectedProcedure.query(({ ctx }) => {
    if (ctx.user) {
      return { greeting: `hello ${ctx.user?.username}` };
    }

    return 'not signed in';
  }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    //delete everything in db except users

    const deleteListend = ctx.prisma.listened.deleteMany();
    const deleteWantToListen = ctx.prisma.wantToListen.deleteMany();
    const deleteListening = ctx.prisma.listening.deleteMany();
    const deleteArtist = ctx.prisma.artist.deleteMany();
    const deleteImage = ctx.prisma.image.deleteMany();
    const deleteReview = ctx.prisma.review.deleteMany();
    const deleteTrack = ctx.prisma.track.deleteMany();
    const deleteAlbum = ctx.prisma.album.deleteMany();

    await ctx.prisma.$transaction([
      deleteListend,
      deleteWantToListen,
      deleteListening,
      deleteArtist,
      deleteImage,
      deleteReview,
      deleteTrack,
      deleteAlbum,
    ]);
  }),
});
