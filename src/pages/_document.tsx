import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="auriom" />
        <meta
          name="description"
          content="The social platform for music lovers."
        />
        <meta
          property="og:description"
          content="The social platform for music lovers."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-black">
        <Main />
        <NextScript />
        <script></script>
      </body>
    </Html>
  );
}
