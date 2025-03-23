import { WeatherData } from './types';

const API_URL = 'http://localhost:3001';

export async function fetchWeatherData(city: string): Promise<WeatherData | null> {
  try {
    // First fetch the entire cities object
    const response = await fetch(`${API_URL}/cities`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    
    // Get the specific city data
    const cityData = data[city.toLowerCase()];
    return cityData || null;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

export async function getCitySuggestions(query: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/cities`);
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    
    return Object.values<WeatherData>(data)
      .map(city => city.city)
      .filter(cityName => 
        cityName.toLowerCase().includes(query.toLowerCase())
      );
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
}