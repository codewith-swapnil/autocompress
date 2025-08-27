if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => caches.delete(cacheName));
  });
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(sw => sw.unregister());
  });
  console.log('Service workers unregistered and caches cleared');
}