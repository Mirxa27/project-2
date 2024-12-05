import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProperty } from '../services/propertyService';
import { createBooking } from '../services/bookingService';
import { isAuthenticated, getCurrentUser } from '../services/authService';

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        try {
          setLoading(true);
          const fetchedProperty = await getProperty(id);
          setProperty(fetchedProperty);
          setError('');
        } catch (err) {
          setError('Failed to fetch property details. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (property && checkIn && checkOut) {
      const nights = calculateNights(checkIn, checkOut);
      setTotalPrice(nights * property.price);
    }
  }, [property, checkIn, checkOut]);

  const calculateNights = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/booking/${id}` } });
      return;
    }
    if (id) {
      const currentUser = getCurrentUser();
      const bookingData = {
        propertyId: id,
        userId: currentUser.id,
        checkIn,
        checkOut,
        guests,
        totalPrice
      };
      try {
        setLoading(true);
        await createBooking(bookingData);
        alert('Booking successful!');
        navigate('/');
      } catch (err) {
        setError('Booking failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Book {property.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={property.image} alt={property.title} className="w-full h-64 object-cover rounded-lg" />
          <h2 className="text-2xl font-bold mt-4">${property.price} / night</h2>
        </div>
        <div>
          <form onSubmit={handleBooking} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block mb-2">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Guests</label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                min="1"
                max={property.maxGuests}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            {totalPrice > 0 && (
              <div className="mb-4">
                <p className="font-bold">Total Price: ${totalPrice}</p>
              </div>
            )}
            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;