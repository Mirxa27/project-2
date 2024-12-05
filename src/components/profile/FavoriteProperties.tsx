import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PropertyGrid } from '../properties/PropertyGrid';
import { Card, CardContent } from '../ui/Card';
import { toast } from 'react-hot-toast';
import apiClient from '../../services/api/client';

async function getFavorites() {
  const response = await apiClient.get('/favorites');
  return response.data;
}

async function removeFavorite(propertyId: string) {
  await apiClient.delete(`/favorites/${propertyId}`);
}

export function FavoriteProperties() {
  const queryClient = useQueryClient();
  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('Property removed from favorites');
    },
    onError: () => {
      toast.error('Failed to remove property from favorites');
    },
  });

  const handleRemoveFavorite = (propertyId: string) => {
    removeFavoriteMutation.mutate(propertyId);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-lg bg-muted" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!favorites?.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            You haven't added any properties to your favorites yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <PropertyGrid
      properties={favorites.map((fav: any) => fav.property)}
      onFavorite={handleRemoveFavorite}
      favoriteIds={favorites.map((fav: any) => fav.property.id)}
    />
  );
}
