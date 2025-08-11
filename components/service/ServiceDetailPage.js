import { ArrowLeft, Star, CheckCircle, Clock, MapPin, User, MessageCircle } from 'lucide-react';

const ServiceDetailPage = ({ currentService, services, setCurrentPage }) => {
  const service = services[currentService];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50 pb-24">
      {/* Header - make full width */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <button 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-teal-700 font-semibold group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="group-hover:underline">Back</span>
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-2xl">{service.icon}</span>
          {service.title}
        </h1>
        <div className="w-9"></div>
      </div>

      {/* Service Details - center content on large screens */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Service Overview</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm">
                <Clock className="h-4 w-4" />
                <span>30-60 mins</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                <span>4.8/5 (120 reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Verified Professionals</span>
              </div>
            </div>
            
            <button className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2">
              <span>Book Now</span>
            </button>
          </div>

          {/* Providers - responsive grid */}
          <h2 className="text-lg font-bold text-gray-900 mb-4">Available Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.providers.slice(0, 6).map((provider, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col h-full">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-teal-100 to-emerald-100 flex items-center justify-center text-2xl">
                    <User className="text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900">{provider.name}</h3>
                      <span className="flex items-center gap-1 text-amber-700 font-semibold">
                        <Star className="h-4 w-4 fill-amber-400" />
                        {provider.rating}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{provider.experience} years experience</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.distance} km away</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                    View Profile
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg text-sm hover:from-teal-700">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;