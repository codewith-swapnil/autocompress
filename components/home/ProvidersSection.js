import { CheckCircle, User, ArrowRight, MapPin } from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';

const ProviderCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden relative">
    <div className="h-40 bg-teal-100 animate-pulse"></div>
    <div className="p-5">
      <div className="h-6 bg-teal-100 rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="h-4 bg-teal-100 rounded w-1/2 mb-3 animate-pulse"></div>
      <div className="h-4 bg-teal-100 rounded w-2/3 mb-4 animate-pulse"></div>
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-teal-100 rounded-full animate-pulse"></div>
        <div className="flex-1 h-10 bg-teal-100 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

const ProvidersSection = ({ services, providersWithDistance, loadingProviders }) => {
  const { translations } = useTranslation();
  
  return (
    <section className="mx-4 mb-6 bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          <span className="bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">
            {translations.topRatedProfessionals}
          </span>
        </h2>
        <button className="text-teal-700 font-medium text-sm flex items-center gap-1 hover:text-teal-800">
          {translations.viewAll} <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {loadingProviders ? (
          <>
            <ProviderCardSkeleton />
            <ProviderCardSkeleton />
          </>
        ) : (
          providersWithDistance.map((provider) => (
            <div key={`${provider.serviceKey}-${provider.name}`} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all relative">
              <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10">
                <CheckCircle className="h-3 w-3" />
                {translations.verified}
              </div>
              <div className="h-40 bg-gradient-to-r from-teal-700 to-emerald-700 flex items-center justify-center text-6xl text-white">
                {services[provider.serviceKey]?.icon}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{provider.name}</h3>
                <span className="text-teal-700 font-semibold text-sm block mb-3">{services[provider.serviceKey]?.title.replace('सेवाएं', 'विशेषज्ञ')}</span>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <MapPin className="h-4 w-4" />
                  {provider.location} ({provider.distance} {translations.language === 'english' ? 'km' : 'किमी'})
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-100 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-lg text-teal-700">{provider.rating}</div>
                    <div className="text-xs text-gray-500">{translations.rating}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-teal-700">{provider.reviews}+</div>
                    <div className="text-xs text-gray-500">{translations.reviews}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-teal-700">{provider.responseRate}%</div>
                    <div className="text-xs text-gray-500">{translations.response}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-teal-600 text-teal-600 rounded-full font-semibold text-sm hover:bg-teal-50 flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    {translations.profile}
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full font-semibold text-sm hover:from-teal-700 hover:to-emerald-700 flex items-center justify-center gap-2">
                    💬 {translations.chat}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProvidersSection;