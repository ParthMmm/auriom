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
import ErrorBoundary from "@components/ErrorBoundary";
import { objectSans } from "@components/Layout";
import { Analytics } from "@vercel/analytics/react";

const Layout = dynamic(() => import("@components/Layout"), {
  suspense: true,
});

const queryClient = new QueryClient();
const frontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

// const objectSans = localFont({
//   // src: [
//   //   {
//   //     path: "../../public/fonts/PPObjectSans-Bold.woff2",
//   //     weight: "600",
//   //     style: "normal",
//   //   },
//   //   {
//   //     path: "../../public/fonts/PPObjectSans-BoldSlanted.woff2",
//   //     weight: "600",
//   //     style: "italic",
//   //   },

//   //   {
//   //     path: "../../public/fonts/PPObjectSans-Regular.woff2",
//   //     weight: "300",
//   //     style: "normal",
//   //   },
//   // ],
//   src: "../../public/fonts/PPObjectSans-Regular.woff2",
//   variable: "--font-ObjectSans",
// });

// console.log(objectSans);

const MyApp = ({ Component, pageProps, ...appProps }: AppProps) => {
  const getContent = () => {
    if (appProps.router.pathname.includes("/auth")) {
      return (
        <div className={`${objectSans.variable} font-sans `}>
          <Component {...pageProps} />
        </div>
      );
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
          <ErrorBoundary>{getContent()}</ErrorBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ClerkProvider>
      <Analytics />
    </Suspense>
  );
};

export default trpc.withTRPC(MyApp);
