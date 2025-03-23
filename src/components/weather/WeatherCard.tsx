import { WeatherData, TemperatureUnit } from '@/lib/types';
import { formatTemperature } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  CloudDrizzle,
  X 
} from 'lucide-react';

const weatherIcons: Record<string, React.ComponentType> = {
  'sun': Sun,
  'cloud': Cloud,
  'rain': CloudRain,
  'snow': CloudSnow,
  'thunder': CloudLightning,
  'drizzle': CloudDrizzle
};

interface WeatherCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
  onRemove: () => void;
}

export function WeatherCard({ data, unit, onRemove }: WeatherCardProps) {
  const WeatherIcon = weatherIcons[data.icon.toLowerCase()] || Cloud;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{data.city}</h3>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 text-blue-500">
                <WeatherIcon />
              </div>
              <p className="text-3xl font-bold">
                {formatTemperature(data.temperature, unit)}
              </p>
            </div>
            <p className="text-gray-500">{data.condition}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRemove}
            className="hover:text-red-500 hover:border-red-500"
          >
            <X size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <p className="flex items-center justify-between">
            <span className="text-gray-500">Humidity:</span>
            <span>{data.humidity}%</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-gray-500">Wind Speed:</span>
            <span>{data.windSpeed} km/h</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}