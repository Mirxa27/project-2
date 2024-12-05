import { mockCreateBooking, mockGetBookings, mockUpdateBooking, mockCancelBooking } from './mockApi';
import { z } from 'zod';
import apiClient from './api/client';

const validateDates = (checkIn: string, checkOut: string) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  if (checkInDate >= checkOutDate) {
    throw new Error('Check-out date must be after check-in date');
  }
  
  if (checkInDate < new Date()) {
    throw new Error('Check-in date cannot be in the past');
  }
};

const checkOverlappingBookings = async (propertyId: string, checkIn: string, checkOut: string, excludeBookingId?: string) => {
  const bookings = await apiClient.get('/bookings');
  const propertyBookings = bookings.data.filter((booking: any) => 
    booking.propertyId === propertyId && 
    (!excludeBookingId || booking.id !== excludeBookingId)
  );

  const newCheckIn = new Date(checkIn);
  const newCheckOut = new Date(checkOut);

  const hasOverlap = propertyBookings.some((booking: any) => {
    const existingCheckIn = new Date(booking.checkIn);
    const existingCheckOut = new Date(booking.checkOut);
    
    return (
      (newCheckIn >= existingCheckIn && newCheckIn < existingCheckOut) ||
      (newCheckOut > existingCheckIn && newCheckOut <= existingCheckOut) ||
      (newCheckIn <= existingCheckIn && newCheckOut >= existingCheckOut)
    );
  });

  if (hasOverlap) {
    throw new Error('Selected dates overlap with existing bookings');
  }
};

export const bookingSchema = z.object({
  propertyId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  guests: z.number().int().positive(),
  totalPrice: z.number().positive(),
  status: z.enum(['pending', 'confirmed', 'cancelled']),
});

export type Booking = z.infer<typeof bookingSchema> & {
  id: string;
  userId: string;
  createdAt: string;
};

export const bookingService = {
  async getBookings() {
    return apiClient.get('/bookings');
  },

  async getBookingById(id: string) {
    return apiClient.get(`/bookings/${id}`);
  },

  async createBooking(data: Omit<Booking, 'id' | 'userId' | 'createdAt'>) {
    try {
      validateDates(data.checkIn, data.checkOut);
      await checkOverlappingBookings(data.propertyId, data.checkIn, data.checkOut);
      return await apiClient.post('/bookings', data);
    } catch (error: any) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  async updateBooking(id: string, data: Partial<Booking>) {
    try {
      if (data.checkIn && data.checkOut) {
        validateDates(data.checkIn, data.checkOut);
        await checkOverlappingBookings(data.propertyId, data.checkIn, data.checkOut, id);
      }
      return await apiClient.patch(`/bookings/${id}`, data);
    } catch (error: any) {
      console.error(`Error updating booking ${id}:`, error);
      throw error;
    }
  },

  async cancelBooking(id: string) {
    try {
      const booking = await apiClient.get(`/bookings/${id}`);
      const checkIn = new Date(booking.data.checkIn);
      
      // Check cancellation policy (e.g., 24 hours before check-in)
      if (checkIn.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000) {
        throw new Error('Cancellation is only allowed at least 24 hours before check-in');
      }
      
      return await apiClient.post(`/bookings/${id}/cancel`);
    } catch (error: any) {
      console.error(`Error canceling booking ${id}:`, error);
      throw error;
    }
  },

  async getBookingStats() {
    return apiClient.get('/bookings/stats/overview');
  },
};

export const createBooking = async (bookingData: any) => {
  try {
    validateDates(bookingData.checkIn, bookingData.checkOut);
    await checkOverlappingBookings(bookingData.propertyId, bookingData.checkIn, bookingData.checkOut);
    return await apiClient.post('/bookings', bookingData);
  } catch (error: any) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getBookings = async (userId: string) => {
  try {
    return await apiClient.get('/bookings');
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const getBooking = async (id: string) => {
  try {
    return await apiClient.get(`/bookings/${id}`);
  } catch (error: any) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

export const updateBooking = async (id: string, bookingData: any) => {
  try {
    if (bookingData.checkIn && bookingData.checkOut) {
      validateDates(bookingData.checkIn, bookingData.checkOut);
      await checkOverlappingBookings(bookingData.propertyId, bookingData.checkIn, bookingData.checkOut, id);
    }
    return await apiClient.patch(`/bookings/${id}`, bookingData);
  } catch (error: any) {
    console.error(`Error updating booking ${id}:`, error);
    throw error;
  }
};