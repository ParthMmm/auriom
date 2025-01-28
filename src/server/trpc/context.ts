// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// src/server/router/context.ts
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

import { prisma } from '../db/client';
import getToken from '../spotify/auth';

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
// type CreateContextOptions = Record<string, never>;

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 */
export const createContextInner = async ({ auth, spotifyToken, user }) => ({
  prisma,
  auth,
  spotifyToken,
  user,
});

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const auth = getAuth(opts.req);
  const client = await clerkClient();

  const user = await client.users.getUser(auth.userId);

  const spotifyToken = await getToken();

  return await createContextInner({ auth, spotifyToken, user });
};

export type Context = inferAsyncReturnType<typeof createContext>;
