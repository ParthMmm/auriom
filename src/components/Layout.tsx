import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
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
