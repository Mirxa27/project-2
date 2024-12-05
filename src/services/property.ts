import { z } from 'zod';
import apiClient from './api/client';

export const propertySchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20),
  price: z.number().positive(),
  location: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
  amenities: z.array(z.string()),
  images: z.array(z.string().url()),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().positive(),
  maxGuests: z.number().int().positive(),
  type: z.enum(['house', 'apartment', 'villa', 'cottage']),
});

export type Property = z.infer<typeof propertySchema> & {
  id: string;
  host: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  type?: 'house' | 'apartment' | 'villa' | 'cottage';
  bedrooms?: number;
  bathrooms?: number;
  query?: string;
}

export const propertyService = {
  async getProperties(filters: PropertyFilters = {}) {
    return apiClient.get('/properties', { params: filters });
  },

  async getPropertyById(id: string) {
    return apiClient.get(`/properties/${id}`);
  },

  async createProperty(data: Omit<Property, 'id' | 'host' | 'createdAt' | 'updatedAt'>) {
    return apiClient.post('/properties', data);
  },

  async updateProperty(id: string, data: Partial<Property>) {
    return apiClient.put(`/properties/${id}`, data);
  },

  async deleteProperty(id: string) {
    return apiClient.delete(`/properties/${id}`);
  },

  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.post('/properties/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async searchProperties(query: string) {
    return apiClient.get('/properties', {
      params: { query },
    });
  },
};
