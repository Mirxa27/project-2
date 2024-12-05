import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X } from 'lucide-react';
import type { PropertyFilters as Filters } from '../../services/property';

interface PropertyFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

const PROPERTY_TYPES = ['house', 'apartment', 'villa', 'cottage'];
const AMENITIES = [
  'wifi',
  'pool',
  'parking',
  'gym',
  'air_conditioning',
  'kitchen',
  'tv',
  'washer',
];

export function PropertyFilters({
  filters,
  onChange,
  onReset,
}: PropertyFiltersProps) {
  const handleChange = (
    key: keyof Filters,
    value: string | number | string[]
  ) => {
    onChange({ ...filters, [key]: value });
  };

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = filters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];
    handleChange('amenities', newAmenities);
  };

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground"
        >
          <X size={16} className="mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) =>
                handleChange('minPrice', parseInt(e.target.value) || undefined)
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) =>
                handleChange('maxPrice', parseInt(e.target.value) || undefined)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Property Type</label>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map((type) => (
              <Button
                key={type}
                variant={filters.type === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleChange('type', type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Bedrooms</label>
          <Input
            type="number"
            min={1}
            value={filters.bedrooms || ''}
            onChange={(e) =>
              handleChange('bedrooms', parseInt(e.target.value) || undefined)
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Max Guests</label>
          <Input
            type="number"
            min={1}
            value={filters.maxGuests || ''}
            onChange={(e) =>
              handleChange('maxGuests', parseInt(e.target.value) || undefined)
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((amenity) => (
              <Button
                key={amenity}
                variant={
                  filters.amenities?.includes(amenity) ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => handleAmenityToggle(amenity)}
              >
                {amenity.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
