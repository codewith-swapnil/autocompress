import { useState, useEffect } from 'react';
import Head from 'next/head';
import { services, locations, notifications as initialNotifications } from '../data/services';
import LocationBar from '../components/common/LocationBar';
import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import ServicesGrid from '../components/home/ServicesGrid';
import ProvidersSection from '../components/home/ProvidersSection';
import Navigation from '../components/common/Navigation';
import InstallBanner from '../components/common/InstallBanner';
import ServiceDetailPage from '../components/service/ServiceDetailPage';
import NotificationsPage from '../components/notifications/NotificationsPage';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLocation, setCurrentLocation] = useState(locations[0]);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [currentService, setCurrentService] = useState(null);
  const [providersWithDistance, setProvidersWithDistance] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstallBanner(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const providers = Object.entries(services)
      .filter(([_, service]) => service.providers.length > 0)
      .flatMap(([serviceKey, service]) =>
        service.providers.map(provider => ({
          ...provider,
          serviceKey,
          service,
          distance: (Math.random() * 5).toFixed(1),
          responseRate: Math.floor(Math.random() * 5) + 95
        }))
      );

    setTimeout(() => {
      setProvidersWithDistance(providers);
      setLoadingProviders(false);
    }, 500);
  }, []);

  const refreshLocation = () => {
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const showService = (serviceKey) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentService(serviceKey);
      setCurrentPage('service');
      setIsTransitioning(false);
    }, 300);
  };

  const goToPage = (page) => {
    if (page === currentPage) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 300);
  };

  const HomePage = () => (
    <div className={`min-h-screen bg-gradient-to-b from-white to-teal-50 pb-20 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <LocationBar currentLocation={currentLocation} refreshLocation={refreshLocation} />
      <Header notifications={notifications} setCurrentPage={goToPage} />
      
      {/* Responsive container for all sections */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <Hero />
        <ServicesGrid services={services} showService={showService} />
        <ProvidersSection 
          services={services} 
          providersWithDistance={providersWithDistance} 
          loadingProviders={loadingProviders} 
        />
      </div>
    </div>
  );

  const getPageTitle = () => {
    switch(currentPage) {
      case 'service': return `${services[currentService]?.title || 'Service'} | FixKaro`;
      case 'notifications': return 'Notifications | FixKaro';
      default: return 'FixKaro - Home Services App';
    }
  };

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="description" content="Book reliable home services professionals for all your needs" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      {/* Remove fixed max-width and shadow */}
      <div className="bg-white min-h-screen relative">
        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {currentPage === 'home' && <HomePage />}
          
          {currentPage === 'service' && (
            <ServiceDetailPage 
              currentService={currentService} 
              services={services} 
              setCurrentPage={goToPage} 
            />
          )}
          
          {currentPage === 'notifications' && (
            <NotificationsPage 
              notifications={notifications} 
              clearNotifications={clearNotifications} 
              setCurrentPage={goToPage} 
            />
          )}
          
          {currentPage !== 'home' && currentPage !== 'service' && currentPage !== 'notifications' && (
            <div className="min-h-screen bg-gradient-to-b from-white to-teal-50 flex items-center justify-center p-4">
              <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-teal-100 max-w-md">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🚧</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">{currentPage} Page</h2>
                <p className="text-gray-600 mb-6">This page is under construction</p>
                <button
                  onClick={() => goToPage('home')}
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-teal-500/20"
                >
                  Go Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation and InstallBanner with centered max-width */}
        <div className="fixed bottom-0 left-0 right-0 z-50 max-w-6xl mx-auto">
          <Navigation currentPage={currentPage} setCurrentPage={goToPage} />
          <InstallBanner 
            showInstallBanner={showInstallBanner} 
            setShowInstallBanner={setShowInstallBanner} 
          />
        </div>
      </div>
    </>
  );
};

export default Home;