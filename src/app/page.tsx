'use client';

import { useState, useEffect } from 'react';
import { CitySearch } from '@/components/weather/CitySearch';
import { WeatherGrid } from '@/components/weather/WeatherGrid';
import { Toggle } from '@/components/ui/Toggle';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { WeatherData, TemperatureUnit } from '@/lib/types';
import { fetchWeatherData } from '@/lib/weatherService';
import { AVAILABLE_CITIES } from '@/lib/constants';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<WeatherData[]>([]);
  const [unit, setUnit] = useLocalStorage<TemperatureUnit>("unit", "celsius");
  const [isLoading, setIsLoading] = useState(false);

  // Load initial city (London) on mount
  useEffect(() => {
    const loadInitialCity = async () => {
      const london = await fetchWeatherData('london');
      if (london && cities.length === 0) {
        setCities([london]);
      }
      setMounted(true);
    };
    loadInitialCity();
  }, []);

  if (!mounted) return null;

  const handleAddCity = async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!AVAILABLE_CITIES.some(c => c.toLowerCase() === city.toLowerCase())) {
        setError(`Please select from: ${AVAILABLE_CITIES.join(', ')}`);
        return;
      }

      // Check if city already exists
      const cityExists = cities.some(c => c.city.toLowerCase() === city.toLowerCase());
      if (cityExists) {
        setError('This city is already on your dashboard');
        return;
      }

      const weatherData = await fetchWeatherData(city);
      if (weatherData) {
        setCities((prevCities) => [...prevCities, weatherData]);
      }
    } catch (error) {
      console.error('Failed to add city:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCity = (city: string) => {
    setCities((prevCities) => prevCities.filter((c) => c.city !== city));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Weather Dashboard</h1>
        
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-auto">
            <CitySearch onSelect={handleAddCity} isLoading={isLoading} />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
          <Toggle
            pressed={unit === 'fahrenheit'}
            onPressedChange={(pressed) => setUnit(pressed ? 'fahrenheit' : 'celsius')}
          >
            {unit === 'celsius' ? '°C' : '°F'}
          </Toggle>
        </div>
      </div>

      <WeatherGrid
        cities={cities}
        unit={unit}
        onRemoveCity={handleRemoveCity}
        isLoading={isLoading} onAddCity={handleAddCity} />
    </main>
  );
}
