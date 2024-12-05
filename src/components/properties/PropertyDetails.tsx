import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users } from 'lucide-react';
import { useProperty } from '../../hooks/useProperties';
import { useCreateBooking, useCheckAvailability, useCalculatePrice } from '../../hooks/useBookings';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const { data: property, isLoading } = useProperty(id!);
  const checkAvailability = useCheckAvailability();
  const calculatePrice = useCalculatePrice();
  const createBooking = useCreateBooking();

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please login to book a property');
      navigate('/login', { state: { from: `/properties/${id}` } });
      return;
    }

    try {
      const isAvailable = await checkAvailability.mutateAsync({
        propertyId: id!,
        checkIn,
        checkOut,
      });

      if (!isAvailable) {
        toast.error('Property is not available for selected dates');
        return;
      }

      const totalPrice = await calculatePrice.mutateAsync({
        propertyId: id!,
        checkIn,
        checkOut,
        guests,
      });

      await createBooking.mutateAsync({
        propertyId: id!,
        checkIn,
        checkOut,
        guests,
        totalPrice,
      });

      toast.success('Booking created successfully');
      navigate('/bookings');
    } catch (error) {
      toast.error('Failed to create booking');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-2/3 rounded bg-muted" />
          <div className="h-96 rounded bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-1/3 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <p>Property not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="mb-4 text-4xl font-bold">{property.title}</h1>
          <div className="mb-6 text-muted-foreground">
            <p>
              {property.location.city}, {property.location.country}
            </p>
          </div>

          <div className="mb-8 aspect-video overflow-hidden rounded-lg">
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {property.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="prose max-w-none">
            <h2>About this property</h2>
            <p>{property.description}</p>

            <h2>Amenities</h2>
            <ul className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity) => (
                <li key={amenity}>
                  {amenity.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>
                ${property.price}
                <span className="text-base font-normal text-muted-foreground">
                  /night
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Check-in</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={checkIn}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Check-out</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={checkOut}
                      min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    min={1}
                    max={property.maxGuests}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleBooking}
                disabled={!checkIn || !checkOut || !guests}
              >
                Book Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
