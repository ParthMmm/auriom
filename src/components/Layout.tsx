import Head from "next/head";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>albus</title>
      </Head>
      <div>{children}</div>
    </>
  );
}

export default Layout;
