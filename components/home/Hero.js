import { Search, CheckCircle, Star, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';
import { useState } from 'react';

const Hero = () => {
  const { translations } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <section className="px-4 py-12 text-center bg-gradient-to-b from-white to-teal-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-1/4 w-24 h-24 rounded-full bg-teal-200/30 blur-2xl"></div>
      <div className="absolute bottom-20 right-1/4 w-32 h-32 rounded-full bg-emerald-200/30 blur-2xl"></div>
      
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-gray-900 max-w-2xl mx-auto">
          <span className="block bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-2">
            {translations.reliable}
          </span>
          {translations.homeServices}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto font-light leading-relaxed">
          {translations.connectWithPros}
        </p>

        <div className="flex justify-center flex-wrap gap-3 mb-10">
          <div className="bg-white px-4 py-2.5 rounded-xl shadow-md border border-gray-200 text-emerald-700 font-medium text-sm flex items-center gap-2 hover:shadow-lg transition-shadow hover:-translate-y-0.5">
            <CheckCircle className="h-4 w-4 text-emerald-600" strokeWidth={2.5} />
            <span>{translations.verifiedPros}</span>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl shadow-md border border-gray-200 text-amber-700 font-medium text-sm flex items-center gap-2 hover:shadow-lg transition-shadow hover:-translate-y-0.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-500" strokeWidth={2.5} />
            <span>4.9/5 {translations.ratings}</span>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl shadow-md border border-gray-200 text-teal-700 font-medium text-sm flex items-center gap-2 hover:shadow-lg transition-shadow hover:-translate-y-0.5">
            <ShieldCheck className="h-4 w-4 text-teal-600" strokeWidth={2.5} />
            <span>{translations.safeBooking}</span>
          </div>
        </div>

        <div className={`bg-white rounded-2xl shadow-lg border ${
          isFocused ? 'border-teal-300 shadow-teal-200/30' : 'border-gray-200'
        } overflow-hidden max-w-xl mx-auto flex transition-all duration-300`}>
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={translations.language === 'english' 
                ? "Search for services..." 
                : "सेवाओं के लिए खोजें..."}
              className="w-full px-5 py-4 text-base outline-none bg-transparent"
            />
            {!searchValue && (
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <span className="text-gray-400">{translations.language === 'english' ? "e.g. Plumber, Electrician" : "जैसे प्लंबर, इलेक्ट्रीशियन"}</span>
              </div>
            )}
          </div>
          <button className={`px-5 flex items-center font-semibold transition-all ${
            searchValue 
              ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white'
              : 'bg-gray-100 text-gray-400'
          }`}>
            <Search className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
        
        <div className="mt-4 flex justify-center gap-3 flex-wrap">
          <button className="text-sm bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-1.5 rounded-full flex items-center gap-1 hover:from-teal-600 hover:to-emerald-600 transition-all">
            <Zap className="h-4 w-4" />
            <span>{translations.emergencyServices}</span>
          </button>
          <button className="text-sm bg-white text-gray-600 border border-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors">
            {translations.popularServices}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;