import { Home, Search, UserPlus, User, MoreHorizontal, WifiOff } from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';
import { useState, useEffect } from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const { translations } = useTranslation();
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineBadge, setShowOfflineBadge] = useState(false);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineBadge(true);
      setTimeout(() => setShowOfflineBadge(false), 3000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial check
    setIsOnline(navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: translations.home || 'Home', offline: true },
    { id: 'search', icon: Search, label: translations.search || 'Search', offline: true },
    { id: 'register', icon: UserPlus, label: translations.register || 'Register', offline: false },
    { id: 'account', icon: User, label: translations.account || 'Account', offline: true },
    { id: 'more', icon: MoreHorizontal, label: translations.more || 'More', offline: true }
  ];

  const handleNavigation = (pageId) => {
    // Prevent navigation to online-only pages when offline
    if (!isOnline) {
      const targetItem = navItems.find(item => item.id === pageId);
      if (!targetItem.offline) {
        setShowOfflineBadge(true);
        setTimeout(() => setShowOfflineBadge(false), 2000);
        return;
      }
    }
    
    setCurrentPage(pageId === 'home' ? 'home' : pageId);
  };

  return (
    <>
      {/* Offline Indicator Badge */}
      {showOfflineBadge && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg z-50 animate-bounce">
          <WifiOff className="h-4 w-4 mr-2" />
          <span>{translations.offlineWarning || 'Available offline only'}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around py-2 max-w-lg mx-auto z-50 shadow-[0_-2px_20px_rgba(0,0,0,0.03)] pb-[env(safe-area-inset-bottom)]"
        role="navigation"
        aria-label={translations.mainNavigation || 'Main Navigation'}
      >
        {navItems.map((item) => {
          const isActive = currentPage === (item.id === 'home' ? 'home' : item.id);
          const isDisabled = !item.offline && !isOnline;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              disabled={isDisabled}
              className={`relative flex flex-col items-center py-2 px-3 text-xs font-medium transition-all duration-300 ${
                isActive 
                  ? 'text-teal-700' 
                  : isDisabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:text-teal-500'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-disabled={isDisabled}
              aria-label={item.label}
            >
              {isActive && (
                <span className="absolute -top-3 w-12 h-1 bg-teal-500 rounded-full"></span>
              )}
              
              <div className={`p-2 rounded-full transition-all ${
                isActive 
                  ? 'bg-teal-50 text-teal-700 shadow-[0_2px_10px_rgba(20,184,166,0.25)]' 
                  : isDisabled
                    ? 'opacity-50'
                    : 'hover:bg-gray-100'
              }`}>
                <item.icon 
                  className={`h-5 w-5 transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`} 
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
              </div>
              
              <span className={`mt-1 transition-all ${
                isActive ? 'font-semibold scale-[1.05]' : 'font-medium'
              }`}>
                {item.label}
              </span>
              
              {!item.offline && !isOnline && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-gray-300 rounded-full"></span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Navigation;