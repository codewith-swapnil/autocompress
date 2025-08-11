import { Wrench } from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';

const InstallBanner = ({ showInstallBanner, setShowInstallBanner }) => {
  const { translations } = useTranslation();
  
  if (!showInstallBanner) return null;

  return (
    <div className="fixed bottom-16 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl border border-teal-200 flex items-center gap-4 z-40 max-w-lg mx-auto animate-bounce">
      <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl">
        <Wrench className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1">
          {translations.installApp}
        </h4>
        <p className="text-sm text-gray-600">
          {translations.language === 'hindi' 
            ? "बेहतर अनुभव के लिए इंस्टॉल करें" 
            : "Install for a better experience"}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setShowInstallBanner(false)}
          className="px-3 py-2 text-sm font-semibold bg-teal-50 text-teal-700 rounded-full border border-teal-200 hover:bg-teal-100"
        >
          {translations.installLater}
        </button>
        <button
          onClick={() => {
            alert("App installation would be triggered here in a real PWA");
            setShowInstallBanner(false);
          }}
          className="px-3 py-2 text-sm font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full hover:from-teal-700 hover:to-emerald-700"
        >
          {translations.install}
        </button>
      </div>
    </div>
  );
};

export default InstallBanner;