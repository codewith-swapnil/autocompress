import { Search, CheckCircle, Star } from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';

const Hero = () => {
  const { translations } = useTranslation();
  
  return (
    <section className="px-4 py-8 text-center bg-gradient-to-b from-white to-teal-50">
      <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
        <span className="block bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">
          {translations.reliable}
        </span>
        {translations.homeServices}
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto font-light">
        {translations.connectWithPros}
      </p>

      <div className="flex justify-center flex-wrap gap-3 mb-8">
        <div className="bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-emerald-700 font-medium text-sm flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>{translations.verifiedPros}</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-emerald-700 font-medium text-sm flex items-center gap-2">
          <Star className="h-4 w-4" />
          <span>4.9/5 {translations.ratings}</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-emerald-700 font-medium text-sm flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>{translations.safeBooking}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden max-w-md mx-auto flex">
        <input
          type="text"
          placeholder={translations.language === 'english' 
            ? "Search for services..." 
            : "सेवाओं के लिए खोजें..."}
          className="flex-1 px-5 py-4 bg-gray-50 text-base outline-none"
        />
        <button className="px-5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold hover:from-teal-700 hover:to-emerald-700 transition-colors">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero;