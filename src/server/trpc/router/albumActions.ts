import {
  logSchema,
  getLogSchema,
  getLogUserSchema,
} from "@utils/types/logSchema";
import { router, publicProcedure } from "../trpc";

const actions = [
  { name: "currently listening" },
  { name: "listened" },
  { name: "want to listen" },
];

export const albumActionsRouter = router({
  getAllActions: publicProcedure
    .input(getLogUserSchema)
    .query(async ({ input, ctx }) => {
      // get user id from username
      const user = await ctx.prisma.user.findFirst({
        where: {
          username: input.username,
        },
      });

      const user_id = user?.id;

      const listened = await ctx.prisma.listened.findMany({
        where: {
          userId: user_id,
        },
      });

      const listening = await ctx.prisma.listening.findMany({
        where: {
          userId: user_id,
        },
      });

      const wantToListen = await ctx.prisma.wantToListen.findMany({
        where: {
          userId: user_id,
        },
      });

      return { listened, listening, wantToListen };
    }),

  getActions: publicProcedure
    .input(getLogSchema)
    .query(async ({ input, ctx }) => {
      const { artist, album, user_id } = input;

      if (ctx.user) {
        const ifListened = await ctx.prisma.listened.findFirst({
          where: {
            artist: artist,
            album: album,
            userId: user_id,
          },
        });

        const ifListening = await ctx.prisma.listening.findFirst({
          where: {
            artist: artist,
            album: album,
            userId: user_id,
          },
        });

        const ifWantToListen = await ctx.prisma.wantToListen.findFirst({
          where: {
            artist: artist,
            album: album,
            userId: user_id,
          },
        });

        return { ifListened, ifListening, ifWantToListen };
      }
    }),

  handleAction: publicProcedure
    .input(logSchema)
    .mutation(async ({ input, ctx }) => {
      const { mbid, artist, album, user_id, action } = input;
      if (ctx.user) {
        const res = await helper(ctx, artist, album, user_id, action);

        if (res) {
          if (action === "listened") {
            if (mbid) {
              const action = await ctx.prisma.listened.create({
                data: {
                  artist: artist,
                  album: album,
                  userId: user_id,
                  mbid: mbid,
                },
              });

              return { action };
            }

            const action = await ctx.prisma.listened.create({
              data: {
                artist: artist,
                album: album,
                userId: user_id,
              },
            });

            return action;
          }

          if (action === "listening") {
            if (mbid) {
              const action = await ctx.prisma.listening.create({
                data: {
                  artist: artist,
                  album: album,
                  userId: user_id,
                  mbid: mbid,
                },
              });

              return action;
            }

            const action = await ctx.prisma.listening.create({
              data: {
                artist: artist,
                album: album,
                userId: user_id,
              },
            });

            return action;
          }

          if (action === "wantToListen") {
            if (mbid) {
              const action = await ctx.prisma.wantToListen.create({
                data: {
                  artist: artist,
                  album: album,
                  userId: user_id,
                  mbid: mbid,
                },
              });

              return action;
            }

            const action = await ctx.prisma.wantToListen.create({
              data: {
                artist: artist,
                album: album,
                userId: user_id,
              },
            });

            return action;
          }
        }
      } else {
        return "not auth";
      }
    }),
});

// helper function to check if user has logged listend, listened, or wantToListen

const helper = async (
  ctx: { prisma: any; user?: any; spotifyToken?: any },
  artist: string,
  album: string,
  user_id: string,
  action: string
) => {
  const isListened = await ctx.prisma.listened.findFirst({
    where: {
      artist: artist,
      album: album,
      userId: user_id,
    },
  });

  const isListening = await ctx.prisma.listening.findFirst({
    where: {
      artist: artist,
      album: album,
      userId: user_id,
    },
  });

  const ifWantToListen = await ctx.prisma.wantToListen.findFirst({
    where: {
      artist: artist,
      album: album,
      userId: user_id,
    },
  });

  if (!isListened && !isListening && !ifWantToListen) {
    return action;
  }

  if (isListened && action != "listened") {
    await ctx.prisma.listened.delete({
      where: {
        id: isListened.id,
      },
    });
  }

  if (isListening && action != "listening") {
    await ctx.prisma.listening.delete({
      where: {
        id: isListening.id,
      },
    });
  }

  if (ifWantToListen && action != "wantToListen") {
    await ctx.prisma.wantToListen.delete({
      where: {
        id: ifWantToListen.id,
      },
    });
  }

  return action;
};
