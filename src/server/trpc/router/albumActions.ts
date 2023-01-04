import { Image } from "./../../../utils/types/index";
import {
  logSchema,
  getLogSchema,
  getLogUserSchema,
} from "@utils/schemas/logSchema";
import { router, publicProcedure } from "../trpc";

const actions = [
  { name: "currently listening" },
  { name: "listened" },
  { name: "want to listen" },
];

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
          Album: {
            include: {
              images: true,
            },
          },
        },
      });

      const listening = await ctx.prisma.listening.findMany({
        where: {
          userId: user_id,
        },
        include: {
          Album: {
            include: {
              images: true,
            },
          },
        },
      });

      const wantToListen = await ctx.prisma.wantToListen.findMany({
        where: {
          userId: user_id,
        },
        include: {
          Album: {
            include: {
              images: true,
            },
          },
        },
      });

      return { listened, listening, wantToListen };
    }),

  getUserActionsForAlbum: publicProcedure
    .input(getLogSchema)
    .query(async ({ input, ctx }) => {
      const { uri, user_id } = input;

      if (ctx.user) {
        const ifListened = await ctx.prisma.listened.findFirst({
          where: {
            albumUri: uri,
            userId: user_id,
          },
        });

        const ifListening = await ctx.prisma.listening.findFirst({
          where: {
            albumUri: uri,
            userId: user_id,
          },
        });

        const ifWantToListen = await ctx.prisma.wantToListen.findFirst({
          where: {
            albumUri: uri,
            userId: user_id,
          },
        });

        return { ifListened, ifListening, ifWantToListen };
      }
    }),

  handleAction: publicProcedure
    .input(logSchema)
    .mutation(async ({ input, ctx }) => {
      const { uri, artist, title, user_id, action, images } = input;
      if (ctx.user) {
        const res = await helper(ctx, user_id, uri, action);

        // create album row in db if not already there
        // const albumExists = await ctx.prisma.album.findFirst({
        //   where: {
        //     uri: uri,
        //   },
        // });

        // if (!albumExists) {
        //   await ctx.prisma.album.create({
        //     data: {
        //       uri: uri,
        //       artist: artist,
        //       title: album,
        //     },
        //   });
        // }

        if (res) {
          if (action === "listened") {
            const action = await ctx.prisma.listened.create({
              data: {
                artist: artist,
                album: title,
                user: {
                  connect: {
                    id: user_id,
                  },
                },
                // connect images to album

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
              },
              include: {
                Album: true,
              },
            });

            await imageHelper(ctx, images, uri);

            return action;
          }

          if (action === "listening") {
            const action = await ctx.prisma.listening.create({
              data: {
                artist: artist,
                album: title,
                user: {
                  connect: {
                    id: user_id,
                  },
                },
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
              },
              include: {
                Album: true,
              },
            });

            await imageHelper(ctx, images, uri);

            return action;
          }

          if (action === "wantToListen") {
            const action = await ctx.prisma.wantToListen.create({
              data: {
                artist: artist,
                album: title,
                user: {
                  connect: {
                    id: user_id,
                  },
                },
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
              },
              include: {
                Album: true,
              },
            });

            await imageHelper(ctx, images, uri);

            return action;
          }
        }
      } else {
        return "not auth";
      }
    }),
});

// helper function to check if user has logged listend, listened, or wantToListen

const imageHelper = async (ctx: { prisma: any }, images: any, uri: string) => {
  if (images[0].url) {
    const imageExists = await ctx.prisma.image.findFirst({
      where: {
        url: images[0].url,
      },
    });

    if (imageExists) {
      return null;
    }
  }

  return images.map(
    async (image: { url: string; height: string; width: string }) => {
      const imageExists = await ctx.prisma.image.findFirst({
        where: {
          url: image.url,
        },
      });

      console.log(image.height, image.width, image.url);

      if (!imageExists) {
        await ctx.prisma.image.create({
          data: {
            height: image.height,
            width: image.width,
            url: image.url,

            Album: {
              connect: {
                uri: uri,
              },
            },
          },
        });
      }
    }
  );
};

const helper = async (
  ctx: { prisma: any; user?: any; spotifyToken?: any },
  user_id: string,
  uri: string,
  action: string
) => {
  const isListened = await ctx.prisma.listened.findFirst({
    where: {
      albumUri: uri,
      userId: user_id,
    },
  });

  const isListening = await ctx.prisma.listening.findFirst({
    where: {
      albumUri: uri,
      userId: user_id,
    },
  });

  const ifWantToListen = await ctx.prisma.wantToListen.findFirst({
    where: {
      albumUri: uri,
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
