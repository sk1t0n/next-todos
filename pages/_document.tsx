import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument: React.FC = () => (
  <Html lang="en">
    <Head>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
