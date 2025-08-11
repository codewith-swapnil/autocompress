import { Home, Search, UserPlus, User, MoreHorizontal } from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const { translations } = useTranslation();
  
  const navItems = [
    { id: 'home', icon: Home, label: translations.home || 'Home' },
    { id: 'search', icon: Search, label: translations.search || 'Search' },
    { id: 'register', icon: UserPlus, label: translations.register || 'Register' },
    { id: 'account', icon: User, label: translations.account || 'Account' },
    { id: 'more', icon: MoreHorizontal, label: translations.more || 'More' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 flex justify-around py-2 max-w-lg mx-auto z-50 shadow-[0_-2px_20px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const isActive = currentPage === (item.id === 'home' ? 'home' : item.id);
        return (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id === 'home' ? 'home' : item.id)}
            className={`relative flex flex-col items-center py-2 px-3 text-xs font-medium transition-all duration-300 ${
              isActive ? 'text-teal-700' : 'text-gray-500 hover:text-teal-500'
            }`}
          >
            {isActive && (
              <span className="absolute -top-3 w-12 h-1 bg-teal-500 rounded-full"></span>
            )}
            
            <div className={`p-2 rounded-full transition-all ${
              isActive 
                ? 'bg-teal-50 text-teal-700 shadow-[0_2px_10px_rgba(20,184,166,0.25)]' 
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
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;