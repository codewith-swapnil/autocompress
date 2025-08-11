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
    setCurrentService(serviceKey);
    setCurrentPage('service');
  };

  const HomePage = () => (
    <div className="min-h-screen bg-teal-50 pb-20">
      <LocationBar currentLocation={currentLocation} refreshLocation={refreshLocation} />
      <Header notifications={notifications} setCurrentPage={setCurrentPage} />
      <div className="bg-teal-50">
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

  return (
    <>
      <Head>
        <title>FixKaro - Home Services App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0d9488" />
      </Head>

      <div className="max-w-lg mx-auto bg-white min-h-screen relative overflow-hidden shadow-2xl">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'service' && (
          <ServiceDetailPage 
            currentService={currentService} 
            services={services} 
            setCurrentPage={setCurrentPage} 
          />
        )}
        {currentPage === 'notifications' && (
          <NotificationsPage 
            notifications={notifications} 
            clearNotifications={clearNotifications} 
            setCurrentPage={setCurrentPage} 
          />
        )}
        {currentPage !== 'home' && currentPage !== 'service' && currentPage !== 'notifications' && (
          <div className="min-h-screen bg-teal-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentPage} Page</h2>
              <p className="text-gray-600">This page is under construction</p>
              <button
                onClick={() => setCurrentPage('home')}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full font-semibold hover:from-teal-700 hover:to-emerald-700"
              >
                Go Home
              </button>
            </div>
          </div>
        )}

        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <InstallBanner 
          showInstallBanner={showInstallBanner} 
          setShowInstallBanner={setShowInstallBanner} 
        />
      </div>
    </>
  );
};

export default Home;