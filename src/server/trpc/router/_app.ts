import { trackRouter } from "./track";
import { artistRouter } from "./artist";
// src/server/router/_app.ts
import { router } from "../trpc";
import { albumRouter } from "./album";
import { authRouter } from "./auth";
import { albumActionsRouter } from "./albumActions";

import { exampleRouter } from "./example";
import { spotifyRouter } from "./spotify";
import { reviewRouter } from "./review";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  album: albumRouter,
  artist: artistRouter,
  track: trackRouter,
  albumAction: albumActionsRouter,
  spotify: spotifyRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
