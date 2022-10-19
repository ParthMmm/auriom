// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { Suspense } from "react";
import Layout from "../components/Layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Suspense>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Suspense>
  );
};

export default trpc.withTRPC(MyApp);
