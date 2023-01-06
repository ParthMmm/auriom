// src/server/router/_app.ts
import { router } from '../trpc';
import { albumRouter } from './album';
import { albumActionsRouter } from './albumActions';
import { artistRouter } from './artist';
import { authRouter } from './auth';
import { exampleRouter } from './example';
import { reviewRouter } from './review';
import { spotifyRouter } from './spotify';
import { trackRouter } from './track';

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
