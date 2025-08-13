import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Fonts with display=swap for better loading experience */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color for different browsers */}
        <meta name="theme-color" content="#0d9488" />
        <meta name="msapplication-TileColor" content="#0d9488" />
        
        {/* Apple-Specific PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FixKaro" />
        
        {/* Apple Touch Icons for all required sizes */}
        <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />

        {/* Splash Screen Images for iOS */}
        <link 
          href="/splashscreens/iphone5_splash.png" 
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" 
          rel="apple-touch-startup-image" 
        />
        <link 
          href="/splashscreens/iphone6_splash.png" 
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" 
          rel="apple-touch-startup-image" 
        />
        <link 
          href="/splashscreens/iphoneplus_splash.png" 
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" 
          rel="apple-touch-startup-image" 
        />
        <link 
          href="/splashscreens/iphonex_splash.png" 
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" 
          rel="apple-touch-startup-image" 
        />
        <link 
          href="/splashscreens/iphonexr_splash.png" 
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" 
          rel="apple-touch-startup-image" 
        />
        <link 
          href="/splashscreens/iphonexsmax_splash.png" 
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" 
          rel="apple-touch-startup-image" 
        />
        <link 
          href="/splashscreens/ipad_splash.png" 
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" 
          rel="apple-touch-startup-image" 
        />
        <link 
          href="/splashscreens/ipadpro1_splash.png" 
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" 
          rel="apple-touch-startup-image" 
        />
        <link 
          href="/splashscreens/ipadpro3_splash.png" 
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" 
          rel="apple-touch-startup-image" 
        />
        <link 
          href="/splashscreens/ipadpro2_splash.png" 
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" 
          rel="apple-touch-startup-image" 
        />

        {/* Favicons for different browsers and devices */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Android/Chrome */}
        <link rel="icon" sizes="192x192" href="/icons/android-icon-192x192.png" />
        <link rel="icon" sizes="512x512" href="/icons/icon-512x512.png" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
        
        {/* PWA Capable */}
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Open Graph / Social Sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FixKaro" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}