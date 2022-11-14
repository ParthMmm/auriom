export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXT_PUBLIC_LAST_FM_KEY: string;
      AUTH0_ID: string;
      AUTH0_SECRET: string;
      AUTH0_DOMAIN: string;
      SPOTIFY_ID: string;
      SPOTIFY_SECRET: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
