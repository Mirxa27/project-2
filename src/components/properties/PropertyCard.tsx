import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Heart, MapPin, Users, Bed, Bath } from 'lucide-react';
import { type Property } from '../../services/property';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export function PropertyCard({ property, onFavorite, isFavorite }: PropertyCardProps) {
  const {
    id,
    title,
    price,
    location,
    images,
    bedrooms,
    bathrooms,
    maxGuests,
  } = property;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img
          src={images[0]}
          alt={title}
          className="h-48 w-full object-cover"
        />
        {onFavorite && (
          <button
            onClick={() => onFavorite(id)}
            className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-gray-700 transition-colors hover:text-red-500"
          >
            <Heart className={isFavorite ? 'fill-red-500 text-red-500' : ''} size={20} />
          </button>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>
            {location.city}, {location.country}
          </span>
        </div>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{maxGuests} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{bedrooms} bedrooms</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{bathrooms} bathrooms</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-lg font-semibold">
          ${price}
          <span className="text-sm text-muted-foreground">/night</span>
        </div>
        <Button asChild size="sm">
          <Link to={`/properties/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
