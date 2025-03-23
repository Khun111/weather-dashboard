export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';