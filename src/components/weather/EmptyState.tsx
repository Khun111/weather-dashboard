import { Cloud } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <Cloud className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No cities</h3>
      <p className="mt-1 text-sm text-gray-500">
        Search for a city to start tracking weather
      </p>
    </div>
  )
}