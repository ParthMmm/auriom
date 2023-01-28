import { Head, Html, Main, NextScript } from 'next/document';

const imageURL = 'https://www.auriom.club/api/og';

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
        <meta property="og:image" content={imageURL} />
        <meta property="og:url" content="https://auriom.club" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="auriom.club" />
        <meta name="twitter:card" content={imageURL} />
        <meta name="twitter:image" content={imageURL} />
        <meta name="twitter:title" content="auriom.club" />
        <meta
          name="twitter:description"
          content="The social platform for music lovers."
        />
      </Head>
      <body className="bg-black">
        <Main />
        <NextScript />
        <script></script>
      </body>
    </Html>
  );
}
