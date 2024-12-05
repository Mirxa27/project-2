import React from 'react';
import { PropertyCard } from './PropertyCard';
import { type Property } from '../../services/property';

interface PropertyGridProps {
  properties: Property[];
  onFavorite?: (id: string) => void;
  favoriteIds?: string[];
  loading?: boolean;
}

export function PropertyGrid({
  properties,
  onFavorite,
  favoriteIds = [],
  loading,
}: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse space-y-4 rounded-lg border bg-card p-4"
          >
            <div className="h-48 rounded-md bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-1/3 rounded bg-muted" />
              <div className="h-6 w-3/4 rounded bg-muted" />
            </div>
            <div className="flex gap-4">
              <div className="h-4 w-1/4 rounded bg-muted" />
              <div className="h-4 w-1/4 rounded bg-muted" />
              <div className="h-4 w-1/4 rounded bg-muted" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-6 w-1/3 rounded bg-muted" />
              <div className="h-9 w-24 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-semibold">No properties found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onFavorite={onFavorite}
          isFavorite={favoriteIds.includes(property.id)}
        />
      ))}
    </div>
  );
}
