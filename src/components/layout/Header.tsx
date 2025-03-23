import { TemperatureUnit } from '@/lib/types';
import { Toggle } from '@/components/ui/Toggle';
import { CitySearch } from '@/components/weather/CitySearch';

interface HeaderProps {
  onAddCity: (city: string) => void;
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
}

export function Header({ onAddCity, unit, onUnitChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Weather Dashboard</h1>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <CitySearch onSelect={onAddCity} />
            <Toggle
              pressed={unit === 'fahrenheit'}
              onPressedChange={(pressed) => onUnitChange(pressed ? 'fahrenheit' : 'celsius')}
            >
              °F / °C
            </Toggle>
          </div>
        </div>
      </div>
    </header>
  );
}