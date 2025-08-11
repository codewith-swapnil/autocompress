import { CheckCircle, User, ArrowRight, MapPin, Star, MessageCircle, Clock, Zap } from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';
import { useState } from 'react';

const ProviderCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-lg">
    <div className="relative">
      <div className="h-40 bg-gradient-to-r from-teal-50 to-emerald-50 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
      </div>
      <div className="absolute top-4 right-4 w-20 h-6 bg-teal-100 rounded-full animate-pulse"></div>
    </div>
    <div className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <div className="h-5 bg-teal-100 rounded w-32 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-4 bg-teal-100 rounded w-24 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-teal-100 animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-5">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-teal-100 rounded-full animate-pulse"></div>
          ))}
        </div>
        <div className="h-4 bg-teal-100 rounded w-8 animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 bg-teal-50 rounded-lg animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-teal-100 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
        </div>
        <div className="flex-1 h-10 bg-teal-100 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  </div>
);

const ProvidersSection = ({ services, providersWithDistance, loadingProviders }) => {
  const { translations } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState(null);
  
  return (
    <section className="container mx-auto px-4 sm:px-6 max-w-6xl mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              {translations.topRatedProfessionals}
            </h2>
          </div>
          <p className="text-gray-500 mt-1 max-w-2xl">{translations.basedOnRatings}</p>
        </div>
        <button className="flex items-center gap-2 text-teal-700 font-semibold group">
          <span className="group-hover:underline">{translations.viewAll}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loadingProviders ? (
          <>
            <ProviderCardSkeleton />
            <ProviderCardSkeleton />
            <ProviderCardSkeleton />
            <ProviderCardSkeleton />
          </>
        ) : (
          providersWithDistance.map((provider) => (
            <div 
              key={`${provider.serviceKey}-${provider.name}`} 
              className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative transition-all duration-300 ${
                hoveredCard === provider.name 
                  ? 'shadow-lg -translate-y-1 border-teal-300' 
                  : 'hover:shadow-md'
              }`}
              onMouseEnter={() => setHoveredCard(provider.name)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top ribbon */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10 shadow-md">
                <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>{translations.verified}</span>
              </div>
              
              {/* Service image/icon with gradient overlay */}
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-emerald-700 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl text-white">
                  {services[provider.serviceKey]?.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-sm">
                  <MapPin className="h-3.5 w-3.5 text-teal-600" />
                  <span className="font-semibold">{provider.distance} {translations.language === 'english' ? 'km' : 'किमी'}</span>
                </div>
              </div>
              
              <div className="p-5">
                {/* Provider info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{provider.name}</h3>
                    <span className="text-teal-600 font-medium text-sm block mt-1 truncate">
                      {services[provider.serviceKey]?.title.replace('सेवाएं', 'विशेषज्ञ')}
                    </span>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 border-2 border-white shadow flex items-center justify-center">
                    <User className="h-5 w-5 text-teal-600" />
                  </div>
                </div>
                
                {/* Rating with animated stars */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 transition-all ${
                          i < Math.floor(provider.rating) 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-gray-300'
                        } ${
                          hoveredCard === provider.name 
                            ? 'transform scale-110' 
                            : ''
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="font-bold text-amber-700">{provider.rating}</span>
                  <span className="text-gray-500 text-sm truncate">({provider.reviews} {translations.reviews})</span>
                </div>
                
                {/* Stats with animated hover */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className={`text-center bg-teal-50 rounded-lg py-2 transition-all ${
                    hoveredCard === provider.name ? 'bg-teal-100 shadow-sm' : ''
                  }`}>
                    <div className="font-bold text-lg text-teal-700">{provider.rating}</div>
                    <div className="text-xs text-gray-500">{translations.rating}</div>
                  </div>
                  <div className={`text-center bg-teal-50 rounded-lg py-2 transition-all ${
                    hoveredCard === provider.name ? 'bg-teal-100 shadow-sm' : ''
                  }`}>
                    <div className="font-bold text-lg text-teal-700">{provider.reviews}+</div>
                    <div className="text-xs text-gray-500">{translations.reviews}</div>
                  </div>
                  <div className={`text-center bg-teal-50 rounded-lg py-2 transition-all ${
                    hoveredCard === provider.name ? 'bg-teal-100 shadow-sm' : ''
                  }`}>
                    <div className="font-bold text-lg text-teal-700">{provider.responseRate}%</div>
                    <div className="text-xs text-gray-500">{translations.response}</div>
                  </div>
                </div>
                
                {/* Action buttons with hover effects */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2 hover:border-teal-300 group">
                    <User className="h-4 w-4 text-gray-500 group-hover:text-teal-600 transition-colors" />
                    <span className="truncate">{translations.profile}</span>
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:from-teal-700 hover:to-emerald-700 transition-all shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 group">
                    <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="truncate">{translations.chat}</span>
                  </button>
                </div>
                
                {/* Availability with pulse animation */}
                {provider.availableToday && (
                  <div className="mt-4 flex items-center gap-2 text-sm bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg animate-pulse-slow">
                    <Zap className="h-4 w-4 text-emerald-600 animate-bounce" />
                    <span className="truncate">{translations.availableToday}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProvidersSection;