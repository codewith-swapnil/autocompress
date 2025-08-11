import { MapPin, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../context/TranslationContext';

const LocationBar = ({ onLocationUpdate }) => {
  const { translations } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState(translations.gettingLocation || 'Getting location...');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract area and city from address components
  const getAreaAndCity = (address) => {
    const area = address.suburb || address.neighbourhood || address.village || address.town;
    const city = address.city || address.county || address.state;
    if (area && city) {
      return `${area}, ${city}`;
    }
    if (area) return area;
    if (city) return city;
    return 'Current Location';
  };

  // Fetch user's location
  const fetchLocation = () => {
    setIsLoading(true);
    setError(null);
    setCurrentLocation(translations.gettingLocation || 'Getting location...');
    
    if (!navigator.geolocation) {
      setError(translations.geolocationError || 'Geolocation is not supported by your browser');
      setIsLoading(false);
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
          const locationText = data.address ? getAreaAndCity(data.address) : 'Location found';
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
          setError(translations.locationDetailsError || 'Failed to get location details');
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError(translations.locationAccessError || 'Please enable location access');
        setIsLoading(false);
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
    <div className="sticky top-0 z-50 bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-3 flex items-center text-white">
      <MapPin className="text-white mr-2 h-5 w-5" />
      
      <div className="flex-grow font-medium truncate max-w-[70%]">
        {error || currentLocation}
      </div>

      <button
        onClick={fetchLocation}
        disabled={isLoading}
        className="px-3 py-1.5 text-sm bg-white/20 border border-white/30 rounded-full flex items-center gap-2 hover:bg-white/30 backdrop-blur-sm disabled:opacity-50"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{translations.refresh}</span>
      </button>
    </div>
  );
};

export default LocationBar;