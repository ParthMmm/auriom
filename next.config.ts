import type { NextConfig } from 'next/types';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: [
      'lastfm.freetls.fastly.net',
      'images.clerk.dev',
      'www.gravatar.com',
      'i.scdn.co',
      'img.clerk.com',
    ],
  },
};

export default nextConfig;
