import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';
import { getCitySuggestions } from '@/lib/weatherService';

interface CitySearchProps {
  onSelect: (city: string) => void;
  isLoading?: boolean;
}

export function CitySearch({ onSelect, isLoading }: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        const cities = await getCitySuggestions(query);
        setSuggestions(cities);
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSelect(query.trim());
      setQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
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

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border max-h-60 overflow-auto">
          {suggestions.map((city) => (
            <li
              key={city}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(city);
                onSelect(city);
                setIsOpen(false);
                setQuery('');
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}