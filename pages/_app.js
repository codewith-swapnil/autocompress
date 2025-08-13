import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { TranslationProvider } from '../context/TranslationContext';
import { ToastProvider, useToast } from '../context/ToastContext'; // Added useToast import
import '../styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 }
};

// PWA Update Handler Component
const PWAUpdater = () => {
  const { showToast } = useToast(); // Now properly imported
  const [swUpdate, setSwUpdate] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const handleSwUpdate = (registration) => {
        setSwUpdate({
          update: () => {
            if (registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
          },
          reload: () => window.location.reload()
        });
      };

      const registerSw = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          
          if (registration.waiting) {
            handleSwUpdate(registration);
            return;
          }

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && registration.waiting) {
                handleSwUpdate(registration);
              }
            });
          });

          navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
          });
        } catch (error) {
          console.error('Service worker registration failed:', error);
        }
      };

      registerSw(); // Register immediately instead of waiting for load event
    }
  }, []);

  useEffect(() => {
    if (swUpdate) {
      showToast({
        message: 'A new version is available!',
        type: 'info',
        action: {
          label: 'Update',
          onClick: () => {
            swUpdate.update();
            showToast({
              message: 'Updating... Page will reload shortly',
              type: 'info',
              duration: 3000
            });
          }
        },
        duration: 0
      });
    }
  }, [swUpdate, showToast]);

  return null;
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 2000);
    
    const handleRouteStart = () => setIsLoading(true);
    const handleRouteComplete = () => setIsLoading(false);
    
    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteComplete);
    router.events.on('routeChangeError', handleRouteComplete);
    
    return () => {
      clearTimeout(splashTimer);
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteComplete);
      router.events.off('routeChangeError', handleRouteComplete);
    };
  }, [router.events]);

  return (
    <TranslationProvider>
      <ToastProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="description" content="FixKaro: Reliable home services professionals for all your needs" />
          <title>FixKaro - Home Services</title>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
          <meta name="theme-color" content="#0d9488" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>
        
        {/* PWA Splash Screen */}
        {showSplash && (
          <div className="fixed inset-0 bg-teal-600 z-[9999] flex flex-col items-center justify-center animate-fadeOut">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-5xl text-teal-600" role="img" aria-label="wrench and spanner">🔧</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-wide">FixKaro</h1>
              <p className="mt-2 text-lg font-light italic">Your reliable home services partner</p>
            </motion.div>
          </div>
        )}

        {/* Loading Indicator */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading-bar"
              initial={{ y: -5 }}
              animate={{ y: 0 }}
              exit={{ y: -5 }}
              className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200"
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "50%", "100%"] }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PWA Update Handler */}
        <PWAUpdater />

        {/* Main Content */}
        <div className="bg-gray-50 min-h-screen">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.route}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </div>
      </ToastProvider>
    </TranslationProvider>
  );
}