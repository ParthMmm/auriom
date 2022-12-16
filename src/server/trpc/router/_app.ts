import { trackRouter } from "./track";
import { artistRouter } from "./artist";
// src/server/router/_app.ts
import { router } from "../trpc";
import { albumRouter } from "./album";
import { authRouter } from "./auth";

import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  album: albumRouter,
  artist: artistRouter,
  track: trackRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
