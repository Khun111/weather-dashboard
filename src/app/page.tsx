'use client';

import { useState, useEffect } from 'react';
import { CitySearch } from '@/components/weather/CitySearch';
import { WeatherGrid } from '@/components/weather/WeatherGrid';
import { Toggle } from '@/components/ui/Toggle';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { WeatherData, TemperatureUnit } from '@/lib/types';

// Mock data for demonstration
const mockWeatherData: Record<string, WeatherData> = {
  london: {
    city: "London",
    temperature: 18,
    condition: "Cloudy",
    humidity: 76,
    windSpeed: 12,
    icon: "cloud"
  },
  "new york": {
    city: "New York",
    temperature: 22,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 8,
    icon: "sun"
  },
  tokyo: {
    city: "Tokyo",
    temperature: 25,
    condition: "Clear",
    humidity: 70,
    windSpeed: 5,
    icon: "sun"
  },
  lagos: {
    city: "Lagos",
    temperature: 30,
    condition: "Sunny",
    humidity: 80,
    windSpeed: 10,
    icon: "sun"
  },
  paris: {
    city: "Paris",
    temperature: 20,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: 15,
    icon: "cloud-sun"
  }
};

export default function Home() {
  // Add mounted state to handle hydration
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useLocalStorage<WeatherData[]>("cities", [
    mockWeatherData.london,
    mockWeatherData.lagos
  ]);
  const [unit, setUnit] = useLocalStorage<TemperatureUnit>("unit", "celsius");
  const [isLoading, setIsLoading] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  const handleAddCity = (city: string) => {
    setIsLoading(true);
    setError(null);
    // Simulate API call delay
    setTimeout(() => {
      const cityKey = city.toLowerCase();
      const newCity = mockWeatherData[cityKey];
      
      if (newCity && !cities.find(c => c.city.toLowerCase() === cityKey)) {
        setCities([...cities, newCity]);
      } else if (!newCity) {
        setError(`City "${city}" not found. Try London, New York, Tokyo, Lagos, or Paris.`);
      } else {
        setError(`${city} is already in your dashboard.`);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveCity = (city: string) => {
    setCities(cities.filter(c => c.city !== city));
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
        isLoading={isLoading}
      />
    </main>
  );
}
