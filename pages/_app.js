import { useState, useEffect } from 'react';
import '../styles/globals.css';
import { TranslationProvider } from '../context/TranslationContext';
import { ToastProvider } from '../context/ToastContext';
import Head from 'next/head';
import Router from 'next/router';

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Register service worker in production
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered: ', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed: ', error);
        });
    }

    // Hide splash screen after delay
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    // Route change handlers
    const handleRouteStart = () => setIsLoading(true);
    const handleRouteComplete = () => setIsLoading(false);
    
    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteComplete);
    Router.events.on('routeChangeError', handleRouteComplete);
    
    return () => {
      clearTimeout(splashTimer);
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteComplete);
      Router.events.off('routeChangeError', handleRouteComplete);
    };
  }, []);

  return (
    <TranslationProvider>
      <ToastProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="description" content="Book reliable home services professionals for all your needs" />
        </Head>
        
        {/* PWA Splash Screen */}
        {showSplash && (
          <div className="fixed inset-0 bg-teal-600 z-[9999] flex items-center justify-center animate-fadeOut">
            <div className="text-white text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl text-teal-600">🔧</span>
              </div>
              <h1 className="text-3xl font-bold">FixKaro</h1>
            </div>
          </div>
        )}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 w-1/3 animate-slide rounded-full"></div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="bg-white min-h-screen">
          <Component {...pageProps} />
        </div>
      </ToastProvider>
    </TranslationProvider>
  );
}