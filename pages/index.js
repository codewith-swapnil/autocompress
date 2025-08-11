import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Bell, Wrench, MapPin, RefreshCw, Search, Star, CheckCircle, User, ArrowLeft, ArrowRight, Home, UserPlus, MoreHorizontal, Trash2, Calendar, Wallet, Users } from 'lucide-react';

const FixKaro = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLocation, setCurrentLocation] = useState('सेक्टर 62, नोएडा');
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'बुकिंग की पुष्टि हुई',
      message: 'आपकी प्लंबिंग सेवा की बुकिंग कल सुबह 10 बजे के लिए पुष्टि की गई है।',
      time: '10 मिनट पहले',
      unread: true,
      icon: Calendar
    },
    {
      id: 2,
      title: 'रीव्यू का अनुरोध',
      message: 'कृपया राजेश कुमार द्वारा प्रदान की गई हाल की इलेक्ट्रिकल सेवा पर अपनी समीक्षा साझा करें।',
      time: '2 घंटे पहले',
      unread: false,
      icon: Star
    },
    {
      id: 3,
      title: 'भुगतान प्राप्त हुआ',
      message: 'आपका भुगतान ₹1,200 सफलतापूर्वक प्राप्त हो गया है। धन्यवाद!',
      time: '2 दिन पहले',
      unread: false,
      icon: Wallet
    },
    {
      id: 4,
      title: 'नया प्रदाता जुड़ा',
      message: 'अब हमारे प्लेटफॉर्म पर 10 नए सत्यापित पेंटिंग विशेषज्ञ उपलब्ध हैं।',
      time: '3 दिन पहले',
      unread: false,
      icon: Users
    }
  ]);
  const [currentService, setCurrentService] = useState(null);
  const [providersWithDistance, setProvidersWithDistance] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(true);

  const locations = [
    "सेक्टर 62, नोएडा",
    "ग्रेटर कैलाश, दिल्ली",
    "बांद्रा पश्चिम, मुंबई",
    "जयनगर, बैंगलोर",
    "साल्ट लेक सिटी, कोलकाता"
  ];

  const services = {
    "Plumbing": {
      title: "प्लंबिंग सेवाएं",
      description: "हमारे सत्यापित प्लंबिंग विशेषज्ञ पाइप लीक, नल स्थापना, सीवर लाइन मरम्मत और अन्य सभी प्लंबिंग समस्याओं के लिए तत्काल सेवा प्रदान करते हैं।",
      icon: "🚿",
      providers: [
        { name: "Rajesh Kumar", rating: 4.8, reviews: 128, location: "सेक्टर 22, दिल्ली" },
        { name: "Vikram Singh", rating: 4.9, reviews: 95, location: "नोएडा सेक्टर 62" },
        { name: "Anil Sharma", rating: 4.7, reviews: 201, location: "ग्रेटर नोएडा" }
      ]
    },
    "Electrical": {
      title: "इलेक्ट्रिकल सेवाएं",
      description: "प्रमाणित इलेक्ट्रीशियन द्वारा वायरिंग, स्विचबोर्ड मरम्मत, लाइटिंग स्थापना और सभी प्रकार की विद्युत समस्याओं का समाधान।",
      icon: "💡",
      providers: [
        { name: "Sunil Sharma", rating: 4.9, reviews: 156, location: "अंधेरी पश्चिम, मुंबई" },
        { name: "Amit Patel", rating: 4.7, reviews: 89, location: "नोएडा सेक्टर 18" }
      ]
    },
    "Painting": {
      title: "पेंटिंग सेवाएं",
      description: "हमारे अनुभवी पेंटर्स घर, कार्यालय और वाणिज्यिक स्थानों के लिए उच्च गुणवत्ता वाली पेंटिंग सेवाएं प्रदान करते हैं।",
      icon: "🎨",
      providers: [
        { name: "Ramesh Verma", rating: 4.6, reviews: 72, location: "ग्रेटर कैलाश, दिल्ली" }
      ]
    },
    "Carpentry": {
      title: "बढ़ईगीरी सेवाएं",
      description: "फर्नीचर मरम्मत, कस्टम वुडवर्क, दरवाजा-खिड़की स्थापना और सभी बढ़ईगीरी कार्यों के लिए विशेषज्ञ।",
      icon: "🔨",
      providers: [
        { name: "Mohan Lal", rating: 4.5, reviews: 64, location: "सेक्टर 45, गुरुग्राम" }
      ]
    },
    "AC Repair": {
      title: "एसी मरम्मत सेवाएं",
      description: "सर्टिफाइड तकनीशियन द्वारा एसी सर्विसिंग, गैस भराई, मरम्मत और रखरखाव सेवाएं उपलब्ध।",
      icon: "❄️",
      providers: [
        { name: "Sanjay Gupta", rating: 4.8, reviews: 112, location: "वसंत कुंज, दिल्ली" }
      ]
    },
    "Cleaning": {
      title: "सफाई सेवाएं",
      description: "पेशेवर सफाईकर्मी द्वारा घर, कार्यालय, कार और फर्नीचर की गहरी सफाई सेवाएं उपलब्ध।",
      icon: "🧹",
      providers: [
        { name: "Priya Cleaners", rating: 4.7, reviews: 205, location: "साकेत, दिल्ली" }
      ]
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstallBanner(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // This runs only on client side
    const providers = Object.entries(services)
      .filter(([_, service]) => service.providers.length > 0)
      .flatMap(([serviceKey, service]) =>
        service.providers.map(provider => ({
          ...provider,
          serviceKey,
          service,
          distance: (Math.random() * 5).toFixed(1),
          responseRate: Math.floor(Math.random() * 5) + 95
        }))
      );

    // Simulate network delay
    setTimeout(() => {
      setProvidersWithDistance(providers);
      setLoadingProviders(false);
    }, 500);
  }, []);

  const refreshLocation = () => {
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setCurrentLocation(locations[nextIndex]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const showService = (serviceKey) => {
    setCurrentService(serviceKey);
    setCurrentPage('service');
  };

  const LocationBar = () => (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-3 flex items-center text-white">
      <MapPin className="text-white mr-2 h-5 w-5" />
      <div className="flex-grow font-medium">{currentLocation}</div>
      <button
        onClick={refreshLocation}
        className="px-3 py-1.5 text-sm bg-white/20 border border-white/30 rounded-full flex items-center gap-2 hover:bg-white/30 backdrop-blur-sm"
      >
        <RefreshCw className="h-4 w-4" />
        <span>ताज़ा करें</span>
      </button>
    </div>
  );

  const Header = () => (
    <header className="sticky top-12 z-40 bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
          <Wrench className="text-white h-5 w-5" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">
          Fix<span className="font-extrabold">Karo</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentPage('notifications')}
          className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200 relative"
        >
          <Bell className="h-5 w-5 text-gray-700" />
          {notifications.some(n => n.unread) && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>
      </div>
    </header>
  );

  const Hero = () => (
    <section className="px-4 py-8 text-center bg-gradient-to-b from-white to-teal-50">
      <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
        <span className="block bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">विश्वसनीय</span>
        Home Services
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto font-light">
        अपनी सभी रखरखाव जरूरतों के लिए सत्यापित पेशेवरों से जुड़ें
      </p>

      <div className="flex justify-center flex-wrap gap-3 mb-8">
        <div className="bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-emerald-700 font-medium text-sm flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>सत्यापित Pros</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-emerald-700 font-medium text-sm flex items-center gap-2">
          <Star className="h-4 w-4" />
          <span>4.9/5 रेटिंग</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-emerald-700 font-medium text-sm flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>सुरक्षित Booking</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden max-w-md mx-auto flex">
        <input
          type="text"
          placeholder="Search for services..."
          className="flex-1 px-5 py-4 bg-gray-50 text-base outline-none"
        />
        <button className="px-5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold hover:from-teal-700 hover:to-emerald-700 transition-colors">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </section>
  );

  const ServicesGrid = () => (
    <section className="mx-4 mb-6 bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          <span className="bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">लोकप्रिय</span> Services
        </h2>
        <button className="text-teal-700 font-medium text-sm flex items-center gap-1 hover:text-teal-800">
          View All <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(services).map(([key, service]) => (
          <div
            key={key}
            onClick={() => showService(key)}
            className="bg-white border border-gray-200 rounded-2xl p-5 text-center cursor-pointer hover:shadow-lg hover:border-teal-400 hover:-translate-y-1 transition-all"
          >
            <div className="w-15 h-15 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl hover:bg-teal-100 transition-colors">
              {service.icon}
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {key === 'Plumbing' && 'प्लंबिंग'}
              {key === 'Electrical' && 'इलेक्ट्रिकल'}
              {key === 'Painting' && 'पेंटिंग'}
              {key === 'Carpentry' && 'बढ़ईगीरी'}
              {key === 'AC Repair' && 'एसी मरम्मत'}
              {key === 'Cleaning' && 'सफाई'}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );

  const ProviderCardSkeleton = () => (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden relative">
      <div className="h-40 bg-teal-100 animate-pulse"></div>
      <div className="p-5">
        <div className="h-6 bg-teal-100 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-teal-100 rounded w-1/2 mb-3 animate-pulse"></div>
        <div className="h-4 bg-teal-100 rounded w-2/3 mb-4 animate-pulse"></div>

        <div className="flex justify-between pt-4 border-t border-gray-100 mb-4">
          <div className="text-center">
            <div className="h-6 bg-teal-100 rounded w-8 mx-auto mb-1 animate-pulse"></div>
            <div className="h-3 bg-teal-100 rounded w-16 mx-auto animate-pulse"></div>
          </div>
          <div className="text-center">
            <div className="h-6 bg-teal-100 rounded w-12 mx-auto mb-1 animate-pulse"></div>
            <div className="h-3 bg-teal-100 rounded w-16 mx-auto animate-pulse"></div>
          </div>
          <div className="text-center">
            <div className="h-6 bg-teal-100 rounded w-8 mx-auto mb-1 animate-pulse"></div>
            <div className="h-3 bg-teal-100 rounded w-16 mx-auto animate-pulse"></div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-teal-100 rounded-full animate-pulse"></div>
          <div className="flex-1 h-10 bg-teal-100 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const ProvidersSection = () => (
    <section className="mx-4 mb-6 bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          <span className="bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">शीर्ष रेटेड</span> Professionals
        </h2>
        <button className="text-teal-700 font-medium text-sm flex items-center gap-1 hover:text-teal-800">
          View All <ArrowRight className="h-4 w-4" />
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
                सत्यापित
              </div>
              <div className="h-40 bg-gradient-to-r from-teal-700 to-emerald-700 flex items-center justify-center text-6xl text-white">
                {services[provider.serviceKey]?.icon}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{provider.name}</h3>
                <span className="text-teal-700 font-semibold text-sm block mb-3">{services[provider.serviceKey]?.title.replace('सेवाएं', 'विशेषज्ञ')}</span>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <MapPin className="h-4 w-4" />
                  {provider.location} ({provider.distance} किमी)
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-100 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-lg text-teal-700">{provider.rating}</div>
                    <div className="text-xs text-gray-500">रेटिंग</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-teal-700">{provider.reviews}+</div>
                    <div className="text-xs text-gray-500">समीक्षाएं</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-teal-700">{provider.responseRate}%</div>
                    <div className="text-xs text-gray-500">प्रतिक्रिया</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-teal-600 text-teal-600 rounded-full font-semibold text-sm hover:bg-teal-50 flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    प्रोफाइल
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full font-semibold text-sm hover:from-teal-700 hover:to-emerald-700 flex items-center justify-center gap-2">
                    💬 चैट
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );

  const ServiceDetailPage = () => {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (currentService) {
        // Simulate API call
        setTimeout(() => {
          setServiceProviders(services[currentService]?.providers || []);
          setLoading(false);
        }, 500);
      }
    }, [currentService]);

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

  const NotificationsPage = () => (
    <div className="min-h-screen bg-teal-50">
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h3 className="font-semibold text-gray-900">सूचनाएं</h3>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200"
          >
            <Trash2 className="h-5 w-5 text-gray-700" />
          </button>
        )}
      </div>

      <div className="p-3">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="h-16 w-16 text-teal-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">कोई सूचना नहीं</h3>
            <p className="text-gray-600">आपके पास कोई नई सूचना नहीं है</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className={`bg-white rounded-xl p-4 border-l-4 shadow-sm ${notification.unread ? 'border-teal-600 bg-teal-50' : 'border-gray-300'
                }`}>
                <div className="flex items-start gap-3">
                  <notification.icon className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{notification.title}</div>
                    <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
                    <div className="text-xs text-gray-500">{notification.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 max-w-lg mx-auto z-50 shadow-lg">
      {[
        { id: 'home', icon: Home, label: 'होम' },
        { id: 'search', icon: Search, label: 'खोजें' },
        { id: 'register', icon: UserPlus, label: 'पंजीकरण' },
        { id: 'account', icon: User, label: 'खाता' },
        { id: 'more', icon: MoreHorizontal, label: 'अधिक' }
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentPage(item.id === 'home' ? 'home' : item.id)}
          className={`flex flex-col items-center py-2 px-3 rounded-lg text-xs font-medium transition-colors ${currentPage === (item.id === 'home' ? 'home' : item.id)
            ? 'text-teal-700'
            : 'text-gray-500'
            }`}
        >
          <item.icon className={`h-6 w-6 mb-1 ${currentPage === (item.id === 'home' ? 'home' : item.id)
            ? 'stroke-2'
            : ''
            }`} />
          {item.label}
        </button>
      ))}
    </nav>
  );

  const InstallBanner = () => showInstallBanner && (
    <div className="fixed bottom-16 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl border border-teal-200 flex items-center gap-4 z-40 max-w-lg mx-auto animate-bounce">
      <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl">
        <Wrench className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1">
          Fix<span className="text-teal-700">Karo</span> App
        </h4>
        <p className="text-sm text-gray-600">बेहतर अनुभव के लिए इंस्टॉल करें</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setShowInstallBanner(false)}
          className="px-3 py-2 text-sm font-semibold bg-teal-50 text-teal-700 rounded-full border border-teal-200 hover:bg-teal-100"
        >
          बाद में
        </button>
        <button
          onClick={() => {
            alert("App installation would be triggered here in a real PWA");
            setShowInstallBanner(false);
          }}
          className="px-3 py-2 text-sm font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full hover:from-teal-700 hover:to-emerald-700"
        >
          इंस्टॉल
        </button>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-teal-50 pb-20">
      <LocationBar />
      <Header />
      <div className="bg-teal-50">
        <Hero />
        <ServicesGrid />
        <ProvidersSection />
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>FixKaro - Home Services App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0d9488" />
      </Head>

      <div className="max-w-lg mx-auto bg-white min-h-screen relative overflow-hidden shadow-2xl">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'service' && <ServiceDetailPage />}
        {currentPage === 'notifications' && <NotificationsPage />}
        {currentPage !== 'home' && currentPage !== 'service' && currentPage !== 'notifications' && (
          <div className="min-h-screen bg-teal-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentPage} Page</h2>
              <p className="text-gray-600">This page is under construction</p>
              <button
                onClick={() => setCurrentPage('home')}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full font-semibold hover:from-teal-700 hover:to-emerald-700"
              >
                Go Home
              </button>
            </div>
          </div>
        )}

        <Navigation />
        <InstallBanner />
      </div>
    </>
  );
};

export default FixKaro;