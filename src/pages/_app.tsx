// src/pages/_app.tsx
import "../styles/globals.css";
import { trpc } from "@utils/trpc";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import Spinner from "@components/Spinner";
import dynamic from "next/dynamic";
import { dark } from "@clerk/themes";

const Layout = dynamic(() => import("@components/Layout"), {
  suspense: true,
});

const queryClient = new QueryClient();
const frontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const MyApp = ({ Component, pageProps, ...appProps }: AppProps) => {
  const getContent = () => {
    if (appProps.router.pathname.includes("/auth")) {
      return <Component {...pageProps} />;
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <Suspense fallback={<Spinner />}>
      <ClerkProvider
        {...pageProps}
        frontendApi={frontendApi}
        appearance={{
          baseTheme: dark,
        }}
      >
        <QueryClientProvider client={queryClient}>
          {getContent()}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ClerkProvider>
    </Suspense>
  );
};

export default trpc.withTRPC(MyApp);
