import { Wrench, X } from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';
import { useEffect, useState } from 'react';

const InstallBanner = ({ showInstallBanner, setShowInstallBanner }) => {
  const { translations } = useTranslation();
  const [isVisible, setIsVisible] = useState(showInstallBanner);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (showInstallBanner) {
      setIsVisible(true);
    } else {
      // Trigger closing animation before hiding
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showInstallBanner]);

  if (!isVisible) return null;

  const handleInstall = () => {
    alert("App installation would be triggered here in a real PWA");
    setShowInstallBanner(false);
  };

  return (
    <div className={`fixed bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-2xl border border-teal-100 z-40 max-w-lg mx-auto transition-all duration-300 ${
      isClosing ? 'translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'
    }`}>
      {/* Close button */}
      <button
        onClick={() => setShowInstallBanner(false)}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <X className="h-5 w-5 text-gray-500" strokeWidth={2} />
      </button>
      
      <div className="flex items-start gap-4 pr-6">
        {/* Animated icon container */}
        <div className="relative">
          <div className="absolute -inset-2 bg-teal-500/20 rounded-full animate-ping opacity-75"></div>
          <div className="relative w-12 h-12 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center text-white">
            <Wrench className="h-6 w-6" strokeWidth={2} />
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1 text-lg">
            {translations.installApp}
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            {translations.language === 'hindi' 
              ? "बेहतर अनुभव के लिए इंस्टॉल करें" 
              : "Install for faster access and better experience"}
          </p>
          
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setShowInstallBanner(false)}
              className="px-4 py-2.5 text-sm font-medium bg-white text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex-1 shadow-sm"
            >
              {translations.installLater}
            </button>
            <button
              onClick={handleInstall}
              className="px-4 py-2.5 text-sm font-bold bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl hover:from-teal-700 hover:to-emerald-700 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-teal-500/20 flex-1"
            >
              {translations.install}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallBanner;