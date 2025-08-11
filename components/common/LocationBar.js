import { MapPin, RefreshCw, LocateFixed } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../context/TranslationContext';

const LocationBar = ({ onLocationUpdate }) => {
  const { translations } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState(translations.gettingLocation || 'Getting location...');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Extract area and city from address components
  const getAreaAndCity = (address) => {
    const area = address.suburb || address.neighbourhood || address.village || address.town;
    const city = address.city || address.county || address.state;
    if (area && city) {
      return `${area}, ${city}`;
    }
    if (area) return area;
    if (city) return city;
    return translations.currentLocation || 'Current Location';
  };

  // Fetch user's location
  const fetchLocation = () => {
    setIsLoading(true);
    setIsRefreshing(true);
    setError(null);
    setCurrentLocation(translations.gettingLocation || 'Getting location...');
    
    if (!navigator.geolocation) {
      setError(translations.geolocationError || 'Geolocation not supported');
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Get readable address from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          // Extract area and city from the address
          const locationText = data.address ? getAreaAndCity(data.address) : translations.locationFound || 'Location found';
          setCurrentLocation(locationText);
          
          // Notify parent component with coordinates
          if (onLocationUpdate) {
            onLocationUpdate({ 
              lat: latitude, 
              lng: longitude,
              address: data.address
            });
          }
        } catch (err) {
          setError(translations.locationDetailsError || 'Failed to get details');
        } finally {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      },
      (err) => {
        setError(translations.locationAccessError || 'Enable location access');
        setIsLoading(false);
        setIsRefreshing(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Initial location fetch
  useEffect(() => {
    fetchLocation();
  }, [translations]);

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-3 flex items-center text-white shadow-lg">
      <div className="relative">
        <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full bg-teal-200/30 animate-ping ${isLoading ? '' : 'hidden'}`}></div>
        <div className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm ${isLoading ? 'animate-pulse' : ''}`}>
          {error ? (
            <LocateFixed className="text-white h-5 w-5" strokeWidth={2.5} />
          ) : (
            <MapPin className={`text-white h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`} strokeWidth={2.5} />
          )}
        </div>
      </div>
      
      <div className="ml-3 flex-grow min-w-0">
        <div className="text-xs opacity-80 tracking-wide">
          {error ? translations.locationError || 'Location error' : translations.yourLocation || 'Your location'}
        </div>
        <div className={`font-medium truncate ${error ? 'text-red-100' : ''}`}>
          {error || currentLocation}
        </div>
      </div>

      <button
        onClick={fetchLocation}
        disabled={isLoading}
        className={`ml-2 px-3 py-2 text-sm flex items-center gap-1.5 rounded-full transition-all duration-300 ${
          isLoading 
            ? 'bg-teal-800 text-teal-200' 
            : 'bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 backdrop-blur-sm'
        }`}
      >
        <RefreshCw 
          className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} 
        />
        <span className="hidden sm:inline">{translations.refresh || 'Refresh'}</span>
      </button>
    </div>
  );
};

export default LocationBar;