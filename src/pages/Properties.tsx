import React, { useState } from 'react';
import { PropertyGrid } from '../components/properties/PropertyGrid';
import { PropertyFilters } from '../components/properties/PropertyFilters';
import { Input } from '../components/ui/Input';
import { Search } from 'lucide-react';
import { useProperties } from '../hooks/useProperties';
import type { PropertyFilters as Filters } from '../services/property';

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  
  const { data: properties, isLoading, error } = useProperties({
    ...filters,
    query: searchQuery,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The query will be handled by the useProperties hook
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleFilterReset = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Find Your Perfect Stay</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse through our collection of beautiful properties
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </form>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
          <PropertyFilters
            filters={filters}
            onChange={handleFiltersChange}
            onReset={handleFilterReset}
          />
        </aside>

        <main>
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              <p>Failed to load properties. Please try again.</p>
            </div>
          ) : (
            <PropertyGrid
              properties={properties || []}
              loading={isLoading}
            />
          )}
        </main>
      </div>
    </div>
  );
}