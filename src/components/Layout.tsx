import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { useAuth, useUser } from "@clerk/nextjs";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <>
      <Head>
        <title>albus</title>
      </Head>
      <div className="bg-white text-black dark:bg-black dark:text-white">
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default Layout;
