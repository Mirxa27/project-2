import { z } from 'zod';
import apiClient from './api/client';

export const bookingSchema = z.object({
  propertyId: z.string(),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
  guests: z.number().int().positive(),
  totalPrice: z.number().positive(),
  specialRequests: z.string().optional(),
});

export type Booking = z.infer<typeof bookingSchema>;

export interface BookingFilters {
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export const bookingService = {
  async createBooking(data: Omit<Booking, 'id' | 'status'>) {
    const response = await apiClient.post('/bookings', data);
    return response.data;
  },

  async getBookings(filters: BookingFilters = {}) {
    const response = await apiClient.get('/bookings', { params: filters });
    return response.data;
  },

  async getBookingById(id: string) {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  },

  async updateBookingStatus(id: string, status: 'confirmed' | 'cancelled') {
    const response = await apiClient.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },

  async getUserBookings() {
    const response = await apiClient.get('/bookings/user');
    return response.data;
  },

  async getHostBookings() {
    const response = await apiClient.get('/bookings/host');
    return response.data;
  },

  async checkAvailability(propertyId: string, checkIn: string, checkOut: string) {
    const response = await apiClient.get(`/bookings/check-availability`, {
      params: { propertyId, checkIn, checkOut },
    });
    return response.data.available;
  },

  async getBookingPrice(propertyId: string, checkIn: string, checkOut: string, guests: number) {
    const response = await apiClient.get(`/bookings/calculate-price`, {
      params: { propertyId, checkIn, checkOut, guests },
    });
    return response.data.totalPrice;
  },
};
