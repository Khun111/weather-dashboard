import { Cloud } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AVAILABLE_CITIES } from '@/lib/constants';

interface EmptyStateProps {
  onCityClick: (city: string) => void;
  isLoading?: boolean;
}

export function EmptyState({ onCityClick, isLoading }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Cloud className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No cities added yet</h3>
      
      {AVAILABLE_CITIES.length > 0 ? (
        <>
          <p className="mt-1 text-sm text-gray-500">
            Add any of these cities to your dashboard:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {AVAILABLE_CITIES.map((city) => (
              <Button
                key={city}
                variant="outline"
                size="sm"
                onClick={() => onCityClick(city)}
                className="hover:bg-blue-50"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : city}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-1 text-sm text-gray-500">
          No cities are available at the moment.
        </p>
      )}
    </div>
  )
}