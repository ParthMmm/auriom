import localFont from '@next/font/local';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Navbar = dynamic(() => import('@components/Navbar'), {
  suspense: true,
});

export const objectSans = localFont({
  src: [
    {
      path: '../../public/fonts/PPObjectSans-Bold.woff2',
      weight: '570',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPObjectSans-BoldSlanted.woff2',
      weight: '570',
      style: 'italic',
    },
    {
      path: '../../public/fonts/PPObjectSans-Heavy.woff2',
      weight: '730',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPObjectSans-HeavySlanted.woff2',
      weight: '730',
      style: 'italic',
    },
    {
      path: '../../public/fonts/PPObjectSans-Regular.woff2',
      weight: '315',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPObjectSans-Slanted.woff2',
      weight: '315',
      style: 'italic',
    },
    {
      path: '../../public/fonts/PPObjectSans-Thin.woff2',
      weight: '140',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPObjectSans-ThinSlanted.woff2',
      weight: '140',
      style: 'italic',
    },
  ],
  variable: '--font-object-sans',
});

function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>auriom</title>
        <meta name="description" content="auriom " />
        <meta property="og:title" content="auriom" />
        <meta property="og:description" content="auriom" />
        <meta property="og:image" content="https://auriom.club/api/og" />
      </Head>
      <div
        className={`min-h-screen ${objectSans.variable} bg-black font-sans text-white`}
      >
        <Navbar />
        <div className="bg-black pt-32">{children}</div>
      </div>
    </>
  );
}

export default Layout;
