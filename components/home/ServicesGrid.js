import { ArrowRight, ChevronRight, Zap } from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';
import { useState } from 'react';

const ServiceCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center cursor-pointer overflow-hidden relative h-full">
    <div className="w-16 h-16 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl mx-auto mb-4 animate-pulse relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
    </div>
    <div className="h-5 bg-teal-100 rounded w-3/4 mx-auto animate-pulse relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
    </div>
  </div>
);

const ServicesGrid = ({ services, showService, loading }) => {
  const { translations } = useTranslation();
  const [hoveredService, setHoveredService] = useState(null);
  
  const serviceKeys = {
    'Plumbing': translations.plumbing,
    'Electrical': translations.electrical,
    'Painting': translations.painting,
    'Carpentry': translations.carpentry,
    'AC Repair': translations.acRepair,
    'Cleaning': translations.cleaning
  };

  const popularServices = Object.entries(services).slice(0, 12); // Show more services on larger screens

  return (
    <section className="container mx-auto px-4 sm:px-6 max-w-6xl mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              {translations.popularServices}
            </h2>
          </div>
          <p className="text-gray-500 mt-1 max-w-2xl">{translations.findProfessionals}</p>
        </div>
        <button className="flex items-center gap-2 text-teal-700 font-semibold group">
          <span className="group-hover:underline">{translations.viewAll}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {loading ? (
          <>
            {[...Array(12)].map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </>
        ) : (
          popularServices.map(([key, service]) => (
            <div
              key={key}
              onClick={() => showService(key)}
              onMouseEnter={() => setHoveredService(key)}
              onMouseLeave={() => setHoveredService(null)}
              className={`bg-white rounded-2xl border border-gray-200 p-5 text-center cursor-pointer group transition-all duration-300 relative overflow-hidden h-full ${
                hoveredService === key 
                  ? 'shadow-lg -translate-y-1 border-teal-300' 
                  : 'hover:shadow-md'
              }`}
            >
              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-teal-600/5 to-emerald-600/5 z-0 transition-opacity duration-300 ${
                hoveredService === key ? 'opacity-100' : 'opacity-0'
              }`}></div>
              
              {/* Icon container with animated shadow */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl relative z-10 transition-all duration-300 ${
                hoveredService === key 
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/30 transform scale-110' 
                  : 'bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-600'
              }`}>
                {service.icon}
              </div>
              
              <h3 className="font-semibold text-gray-900 text-sm relative z-10 transition-colors group-hover:text-teal-700 mb-8">
                {serviceKeys[key]}
              </h3>
              
              {/* Quick action button with slide-up animation */}
              <div className={`absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center gap-1 text-teal-700 font-medium text-xs transition-all duration-300 ${
                hoveredService === key ? 'translate-y-0' : 'translate-y-full'
              } bg-gradient-to-t from-white via-white/90 to-white/80 backdrop-blur-sm border-t border-gray-100`}>
                <Zap className="h-3 w-3 text-amber-500" />
                <span className="truncate">{translations.bookNow}</span>
                <ChevronRight className="h-3 w-3 text-teal-700" />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;