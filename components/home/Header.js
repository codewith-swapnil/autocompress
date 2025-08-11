import { Bell, Wrench, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../context/TranslationContext';

const Header = ({ notifications, setCurrentPage }) => {
  const { translations, language, setLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages = {
    hindi: { name: 'हिंदी', code: 'hi' },
    english: { name: 'English', code: 'en' }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-12 z-40 bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
          <Wrench className="text-white h-5 w-5" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">
          Fix<span className="font-extrabold">करो</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 rounded-full border border-gray-300 hover:bg-gray-200"
          >
            <span>{languages[language].name}</span>
            <ChevronDown className="h-4 w-4 text-gray-700" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
              <button
                onClick={() => handleLanguageChange('english')}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  language === 'english' ? 'bg-teal-50 text-teal-700' : ''
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('hindi')}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  language === 'hindi' ? 'bg-teal-50 text-teal-700' : ''
                }`}
              >
                हिंदी
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button
          onClick={() => setCurrentPage('notifications')}
          className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200 relative"
        >
          <Bell className="h-5 w-5 text-gray-700" />
          {notifications.some(n => n.unread) && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;