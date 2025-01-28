import { addAlbumToDb } from 'src/server/utils';

import {
  getLogSchema,
  getLogUserSchema,
  logSchema,
} from '@utils/schemas/logSchema';

import type { Context } from '../context';
import { protectedProcedure, publicProcedure, router } from '../trpc';

// const actions = [
//   { name: "currently listening" },
//   { name: "listened" },
//   { name: "want to listen" },
// ];

export const albumActionsRouter = router({
  getAllUserActions: publicProcedure
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
        include: {
          album: {
            include: {
              images: true,
              artists: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const listening = await ctx.prisma.listening.findMany({
        where: {
          userId: user_id,
        },
        include: {
          album: {
            include: {
              images: true,
              artists: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const wantToListen = await ctx.prisma.wantToListen.findMany({
        where: {
          userId: user_id,
        },
        include: {
          album: {
            include: {
              images: true,
              artists: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return { listened, listening, wantToListen };
    }),

  getUserActionsForAlbum: protectedProcedure
    .input(getLogSchema)
    .query(async ({ input, ctx }) => {
      const { spotifyId, user_id } = input;

      const ifListened = await ctx.prisma.listened.findFirst({
        where: {
          albumId: spotifyId,
          userId: user_id,
        },
      });

      const ifListening = await ctx.prisma.listening.findFirst({
        where: {
          albumId: spotifyId,
          userId: user_id,
        },
      });

      const ifWantToListen = await ctx.prisma.wantToListen.findFirst({
        where: {
          albumId: spotifyId,
          userId: user_id,
        },
      });

      return { ifListened, ifListening, ifWantToListen };
    }),

  handleAction: protectedProcedure
    .input(logSchema)
    .mutation(async ({ input, ctx }) => {
      const { spotifyId, user_id, action } = input;

      await addAlbumToDb(ctx, spotifyId);
      const res = await helper(ctx, user_id, spotifyId, action);

      if (res) {
        if (action === 'listened') {
          const action = await ctx.prisma.listened.create({
            data: {
              user: {
                connect: {
                  id: user_id,
                },
              },
              album: {
                connect: {
                  spotifyId: spotifyId,
                },
              },
            },
            include: {
              album: true,
            },
          });

          return action;
        }

        if (action === 'listening') {
          const action = await ctx.prisma.listening.create({
            data: {
              user: {
                connect: {
                  id: user_id,
                },
              },
              album: {
                connect: {
                  spotifyId: spotifyId,
                },
              },
            },
            include: {
              album: true,
            },
          });

          return action;
        }

        if (action === 'wantToListen') {
          const action = await ctx.prisma.wantToListen.create({
            data: {
              user: {
                connect: {
                  id: user_id,
                },
              },
              album: {
                connect: {
                  spotifyId: spotifyId,
                },
              },
            },
            include: {
              album: true,
            },
          });

          return action;
        }
      }
    }),
});

// helper function to check if user has logged listend, listened, or wantToListen
const helper = async (
  ctx: Context,
  user_id: string,
  albumId: string,
  action: string
) => {
  const isListened = await ctx.prisma.listened.findFirst({
    where: {
      albumId: albumId,
      userId: user_id,
    },
  });

  const isListening = await ctx.prisma.listening.findFirst({
    where: {
      albumId: albumId,
      userId: user_id,
    },
  });

  const ifWantToListen = await ctx.prisma.wantToListen.findFirst({
    where: {
      albumId: albumId,
      userId: user_id,
    },
  });

  if (!isListened && !isListening && !ifWantToListen) {
    return action;
  }

  if (isListened && action != 'listened') {
    await ctx.prisma.listened.delete({
      where: {
        id: isListened.id,
      },
    });
  }

  if (isListening && action != 'listening') {
    await ctx.prisma.listening.delete({
      where: {
        id: isListening.id,
      },
    });
  }

  if (ifWantToListen && action != 'wantToListen') {
    await ctx.prisma.wantToListen.delete({
      where: {
        id: ifWantToListen.id,
      },
    });
  }

  return action;
};
