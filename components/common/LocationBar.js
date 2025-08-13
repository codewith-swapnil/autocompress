import { MapPin, RefreshCw, LocateFixed } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../../context/TranslationContext';

const LocationBar = ({ onLocationUpdate }) => {
  const { translations } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState(
    translations.gettingLocation || 'Getting location...'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cachedLocation, setCachedLocation] = useState(null);

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

  // Save location to localStorage
  const saveLocationToCache = (location) => {
    try {
      localStorage.setItem('cachedLocation', JSON.stringify({
        text: location.text,
        coords: location.coords,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('Failed to save location to localStorage', e);
    }
  };

  // Get cached location from localStorage
  const getCachedLocation = () => {
    try {
      const cached = localStorage.getItem('cachedLocation');
      if (!cached) return null;
      
      const location = JSON.parse(cached);
      // Consider cached location valid for 1 hour
      if (Date.now() - location.timestamp < 3600000) {
        return location;
      }
    } catch (e) {
      console.warn('Failed to get cached location', e);
    }
    return null;
  };

  // Fetch user's location
  const fetchLocation = useCallback(() => {
    setIsLoading(true);
    setIsRefreshing(true);
    setError(null);
    
    // Try to get cached location first
    const cached = getCachedLocation();
    if (cached && !isRefreshing) {
      setCurrentLocation(cached.text);
      if (onLocationUpdate) {
        onLocationUpdate(cached.coords);
      }
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    setCurrentLocation(translations.gettingLocation || 'Getting location...');

    if (!navigator.geolocation) {
      setError(translations.geolocationError || 'Geolocation not supported');
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    const handlePositionSuccess = async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        
        // Create basic location object
        const locationObj = {
          lat: latitude,
          lng: longitude,
          address: null
        };
        
        let locationText = '';

        // Try to get address from service if online
        if (navigator.onLine) {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            
            if (!response.ok) throw new Error('Reverse geocode failed');
            
            const data = await response.json();
            locationObj.address = data.address;
            locationText = data.address ? getAreaAndCity(data.address) : 
                          translations.locationFound || 'Location found';
          } catch (err) {
            console.warn('Reverse geocoding failed, using coordinates', err);
            locationText = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          }
        } else {
          // Offline mode
          locationText = translations.approximateLocation || 'Approximate location';
        }
        
        setCurrentLocation(locationText);
        saveLocationToCache({
          text: locationText,
          coords: locationObj
        });

        // Notify parent component
        if (onLocationUpdate) {
          onLocationUpdate(locationObj);
        }
      } catch (err) {
        setError(translations.locationDetailsError || 'Failed to get details');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    };

    const handlePositionError = (err) => {
      let errorMessage = translations.locationAccessError || 'Enable location access';
      
      switch(err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = translations.locationPermissionDenied || 'Location permission denied';
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage = translations.locationUnavailable || 'Location unavailable';
          break;
        case err.TIMEOUT:
          errorMessage = translations.locationTimeout || 'Location request timed out';
          break;
      }
      
      setError(errorMessage);
      setIsLoading(false);
      setIsRefreshing(false);
    };

    navigator.geolocation.getCurrentPosition(
      handlePositionSuccess,
      handlePositionError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000 // Accept cached position up to 30 seconds old
      }
    );
  }, [translations, onLocationUpdate, isRefreshing]);

  // Update useEffect dependencies
  useEffect(() => {
    // Initialize with cached location if available
    const cached = getCachedLocation();
    if (cached) {
      setCurrentLocation(cached.text);
      setCachedLocation(cached);
      setIsLoading(false);
    } else {
      fetchLocation();
    }
  }, [fetchLocation]);

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
        className={`ml-2 px-3 py-2 text-sm flex items-center gap-1.5 rounded-full transition-all duration-300 ${isLoading
            ? 'bg-teal-800 text-teal-200'
            : 'bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 backdrop-blur-sm'
          }`}
        aria-label={translations.refreshLocation || 'Refresh location'}
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