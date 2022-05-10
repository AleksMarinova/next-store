import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"
        />
        <div
          hidden
          id="snipcart"
          data-api-key="MTc1NDI1MDEtNmQxMC00NDc0LWI1ZjUtZTRjYzU1NjM3YTk3NjM3ODc3Njk2MjE4MDY1OTkw"
          data-config-modal-style="side"
        />
      </body>
    </Html>
  );
}
