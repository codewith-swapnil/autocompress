import { useState, useEffect } from 'react';
import { ArrowLeft, Star, MapPin } from 'lucide-react';

const ServiceDetailPage = ({ currentService, services, setCurrentPage }) => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentService) {
      setTimeout(() => {
        setServiceProviders(services[currentService]?.providers || []);
        setLoading(false);
      }, 500);
    }
  }, [currentService, services]);

  return (
    <div className="min-h-screen bg-teal-50">
      <div className="bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-200">
        <button
          onClick={() => setCurrentPage('home')}
          className="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h3 className="font-semibold text-gray-900">{services[currentService]?.title}</h3>
      </div>

      <div className="p-5">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl">
            {services[currentService]?.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{services[currentService]?.title}</h2>
          <p className="text-gray-600 max-w-lg mx-auto">{services[currentService]?.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">उपलब्ध पेशेवर</h3>
          {loading ? (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-md border border-gray-200">
                <div className="w-15 h-15 bg-teal-100 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-teal-100 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-teal-100 rounded w-1/2 animate-pulse"></div>
                  <div className="h-3 bg-teal-100 rounded w-2/3 animate-pulse"></div>
                </div>
                <div className="h-10 w-24 bg-teal-100 rounded-full animate-pulse"></div>
              </div>
              <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-md border border-gray-200">
                <div className="w-15 h-15 bg-teal-100 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-teal-100 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-teal-100 rounded w-1/2 animate-pulse"></div>
                  <div className="h-3 bg-teal-100 rounded w-2/3 animate-pulse"></div>
                </div>
                <div className="h-10 w-24 bg-teal-100 rounded-full animate-pulse"></div>
              </div>
            </div>
          ) : serviceProviders.length > 0 ? (
            <div className="space-y-4">
              {serviceProviders.map((provider, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-md border border-gray-200">
                  <div className="w-15 h-15 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-full flex items-center justify-center text-2xl">
                    {services[currentService]?.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{provider.name}</div>
                    <div className="flex items-center gap-1 text-amber-500 text-sm mb-1">
                      <Star className="h-4 w-4 fill-current" />
                      {provider.rating} ({provider.reviews} समीक्षाएं)
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <MapPin className="h-4 w-4" />
                      {provider.location}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full font-medium text-sm hover:from-teal-700 hover:to-emerald-700">
                    बुक करें
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                {services[currentService]?.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">कोई पेशेवर उपलब्ध नहीं</h4>
              <p className="text-gray-600 mb-4">हम जल्द ही आपके क्षेत्र में इस सेवा के लिए पेशेवरों को जोड़ेंगे</p>
              <button className="px-6 py-2 bg-teal-50 border border-teal-100 rounded-full text-sm font-medium hover:bg-teal-100 text-teal-700">
                सूचित करें जब उपलब्ध हो
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;