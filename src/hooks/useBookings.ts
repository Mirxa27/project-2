import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService, type BookingFilters, type Booking } from '../services/booking';
import { toast } from 'react-hot-toast';

export function useBookings(filters: BookingFilters = {}) {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => bookingService.getBookings(filters),
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingService.getBookingById(id),
    enabled: !!id,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Booking, 'id' | 'status'>) => bookingService.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking created successfully');
    },
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'confirmed' | 'cancelled' }) =>
      bookingService.updateBookingStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', variables.id] });
      toast.success(`Booking ${variables.status} successfully`);
    },
  });
}

export function useUserBookings() {
  return useQuery({
    queryKey: ['userBookings'],
    queryFn: bookingService.getUserBookings,
  });
}

export function useHostBookings() {
  return useQuery({
    queryKey: ['hostBookings'],
    queryFn: bookingService.getHostBookings,
  });
}

export function useCheckAvailability() {
  return useMutation({
    mutationFn: ({
      propertyId,
      checkIn,
      checkOut,
    }: {
      propertyId: string;
      checkIn: string;
      checkOut: string;
    }) => bookingService.checkAvailability(propertyId, checkIn, checkOut),
  });
}

export function useCalculatePrice() {
  return useMutation({
    mutationFn: ({
      propertyId,
      checkIn,
      checkOut,
      guests,
    }: {
      propertyId: string;
      checkIn: string;
      checkOut: string;
      guests: number;
    }) => bookingService.getBookingPrice(propertyId, checkIn, checkOut, guests),
  });
}
