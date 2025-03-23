import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Search } from 'lucide-react'

interface CitySearchProps {
  onSelect: (city: string) => void
  isLoading?: boolean
}

export function CitySearch({ onSelect, isLoading }: CitySearchProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSelect(query.trim())
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name"
          className="pl-9"
          disabled={isLoading}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <Button type="submit" disabled={isLoading || !query.trim()}>
        {isLoading ? 'Adding...' : 'Add City'}
      </Button>
    </form>
  )
}