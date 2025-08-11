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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 max-w-lg mx-auto z-50 shadow-lg">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentPage(item.id === 'home' ? 'home' : item.id)}
          className={`flex flex-col items-center py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
            currentPage === (item.id === 'home' ? 'home' : item.id)
              ? 'text-teal-700'
              : 'text-gray-500'
          }`}
        >
          <item.icon className={`h-6 w-6 mb-1 ${
            currentPage === (item.id === 'home' ? 'home' : item.id)
              ? 'stroke-2'
              : ''
          }`} />
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;