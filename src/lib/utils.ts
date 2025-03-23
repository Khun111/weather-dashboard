import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TemperatureUnit } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export function formatTemperature(temp: number, unit: TemperatureUnit): string {
  const formatted = Math.round(unit === 'fahrenheit' ? celsiusToFahrenheit(temp) : temp);
  return `${formatted}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
}