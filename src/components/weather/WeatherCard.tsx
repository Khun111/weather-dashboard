import { WeatherData, TemperatureUnit } from '@/lib/types'
import { formatTemperature } from '@/lib/utils'
import { X } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface WeatherCardProps {
  data: WeatherData
  unit: TemperatureUnit
  onRemove: () => void
}

export function WeatherCard({ data, unit, onRemove }: WeatherCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{data.city}</h3>
            <p className="text-3xl font-bold mt-2">
              {formatTemperature(data.temperature, unit)}
            </p>
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
            <span className="text-gray-500">Condition:</span>
            <span>{data.condition}</span>
          </p>
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
  )
}