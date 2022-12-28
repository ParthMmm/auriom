import { trackRouter } from "./track";
import { artistRouter } from "./artist";
// src/server/router/_app.ts
import { router } from "../trpc";
import { albumRouter } from "./album";
import { authRouter } from "./auth";
import { albumActionsRouter } from "./albumActions";

import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  album: albumRouter,
  artist: artistRouter,
  track: trackRouter,
  albumAction: albumActionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
