import { Bell, Wrench, ChevronDown, Settings } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../context/TranslationContext';

const Header = ({ notifications, setCurrentPage }) => {
  const { translations, language, setLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const languages = {
    hindi: { name: 'हिंदी', code: 'hi' },
    english: { name: 'English', code: 'en' }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Count unread notifications
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-12 z-40 bg-white/80 backdrop-blur-lg px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-sm">
      {/* Logo Section */}
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setCurrentPage('home')}
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-teal-500/10 rounded-lg blur-sm animate-pulse"></div>
          <div className="relative w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
            <Wrench className="text-white h-5 w-5" strokeWidth={2.5} />
          </div>
        </div>
        <div>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent tracking-tight">
            Fix<span className="font-extrabold">करो</span>
          </span>
          <p className="text-[10px] text-gray-500 -mt-1">Service at your door</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Settings Button */}
        <button
          onClick={() => setCurrentPage('settings')}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <Settings className="h-5 w-5 text-gray-600" strokeWidth={1.8} />
        </button>
        
        {/* Notifications */}
        <button
          onClick={() => setCurrentPage('notifications')}
          className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <Bell className="h-5 w-5 text-gray-600" strokeWidth={1.8} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 border-2 border-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
        
        {/* Language Selector */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white rounded-full border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 shadow-sm"
          >
            <span className="font-medium">{languages[language].name}</span>
            <ChevronDown 
              className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-1 border border-gray-200 z-50 overflow-hidden animate-fadeIn">
              <button
                onClick={() => handleLanguageChange('english')}
                className={`flex items-center w-full text-left px-4 py-3 text-sm transition-colors ${
                  language === 'english' 
                    ? 'bg-teal-50 text-teal-700 font-semibold' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="flex-1">English</span>
                {language === 'english' && (
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                )}
              </button>
              <div className="border-t border-gray-100 mx-3"></div>
              <button
                onClick={() => handleLanguageChange('hindi')}
                className={`flex items-center w-full text-left px-4 py-3 text-sm transition-colors ${
                  language === 'hindi' 
                    ? 'bg-teal-50 text-teal-700 font-semibold' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="flex-1">हिंदी</span>
                {language === 'hindi' && (
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;