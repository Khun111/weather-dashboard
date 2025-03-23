import { WeatherCard } from './WeatherCard'
import { EmptyState } from './EmptyState'
import { LoadingState } from './LoadingState'
import { WeatherData, TemperatureUnit } from '@/lib/types'

interface WeatherGridProps {
  cities: WeatherData[]
  unit: TemperatureUnit
  onRemoveCity: (city: string) => void
  onAddCity: (city: string) => void
  isLoading?: boolean
}

export function WeatherGrid({ 
  cities, 
  unit, 
  onRemoveCity, 
  onAddCity,
  isLoading 
}: WeatherGridProps) {
  if (isLoading) {
    return <LoadingState />
  }

  if (cities.length === 0) {
    return <EmptyState onCityClick={onAddCity} isLoading={isLoading} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city) => (
        <WeatherCard
          key={city.city}
          data={city}
          unit={unit}
          onRemove={() => onRemoveCity(city.city)}
        />
      ))}
    </div>
  )
}