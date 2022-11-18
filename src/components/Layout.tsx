import Head from "next/head";
import type { ReactNode } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";

type Props = {
  children: ReactNode;
};

const Navbar = dynamic(() => import("@components/Navbar"), {
  suspense: true,
});

function Layout({ children }: Props) {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <>
      <Head>
        <title>albus</title>
      </Head>
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default Layout;
