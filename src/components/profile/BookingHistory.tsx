import React from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useUserBookings, useUpdateBookingStatus } from '../../hooks/useBookings';
import { toast } from 'react-hot-toast';

export function BookingHistory() {
  const { data: bookings, isLoading } = useUserBookings();
  const updateStatus = useUpdateBookingStatus();

  const handleCancel = async (bookingId: string) => {
    try {
      await updateStatus.mutateAsync({
        id: bookingId,
        status: 'cancelled',
      });
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 w-2/3 rounded bg-muted" />
                <div className="h-4 w-1/3 rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!bookings?.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No bookings found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader>
            <CardTitle>{booking.property.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} />
                <span>
                  {booking.property.location.city},{' '}
                  {booking.property.location.country}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={16} />
                <span>
                  {format(new Date(booking.checkIn), 'MMM d, yyyy')} -{' '}
                  {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} />
                <span>{booking.guests} guests</span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between gap-4">
              <div className="text-right">
                <p className="text-lg font-semibold">
                  ${booking.totalPrice.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Status:{' '}
                  <span
                    className={
                      booking.status === 'confirmed'
                        ? 'text-green-600'
                        : booking.status === 'cancelled'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </p>
              </div>
              {booking.status === 'confirmed' && (
                <Button
                  variant="destructive"
                  onClick={() => handleCancel(booking.id)}
                  disabled={updateStatus.isLoading}
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
