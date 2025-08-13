import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/*
          This meta tag is crucial for a PWA to ensure it takes up the entire viewport.
          It prevents users from being able to zoom, which is standard for most apps.
          `viewport-fit=cover` is a key addition for newer iPhones with a notch.
        */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />

        {/* Fonts are a good candidate for _document.js as they are a global resource */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* PWA Manifest and Theme Color */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d9488" />

        {/* Apple-Specific PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FixKaro" />

        {/*
          The `apple-touch-icon` is critical for iOS.
          It's a good idea to have different sizes to ensure a high-quality icon on all devices.
          We can reference a single high-res icon and let the OS scale it, or provide multiple.
        */}
        <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" />

        {/* Favicons for different browsers and devices */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}