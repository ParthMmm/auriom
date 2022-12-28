import type { Album } from "@utils/types/index";
import { router, publicProcedure } from "../trpc";

// export const albumActionsRouter = router({
//   addListened: publicProcedure

//     .input()
//     .mutation(async ({ input }) => {
//       const { mbid, artist, album, userID } = input;

//       const albumExists = await prisma.album.findFirst({
//         where: {
//           mbid,
//         },
//       });

//       if (albumExists) {
//         return albumExists;
//       }

//       const newAlbum = await prisma.album.create({
//         data: {
//           mbid,
//           album,
//           artist,
//           image,
//         },
//       });

//       return newAlbum;
//     }),
// });
