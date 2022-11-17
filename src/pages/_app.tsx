// src/pages/_app.tsx
import "../styles/globals.css";
import { trpc } from "../utils/trpc";
import { Suspense } from "react";
import Layout from "../components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { ClerkProvider } from "@clerk/nextjs";

const queryClient = new QueryClient();
const frontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  return (
    <Suspense>
      <ClerkProvider {...pageProps} frontendApi={frontendApi}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ClerkProvider>
    </Suspense>
  );
};

export default trpc.withTRPC(MyApp);
