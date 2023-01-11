export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXT_PUBLIC_LAST_FM_KEY: string;
      SPOTIFY_ID: string;
      SPOTIFY_SECRET: string;
      ENV: 'test' | 'dev' | 'prod';
      NEXT_PUBLIC_CLERK_FRONTEND_API: string;
      CLERK_API_KEY: string;
      CLERK_JWT_KEY: string;
    }
  }
}
