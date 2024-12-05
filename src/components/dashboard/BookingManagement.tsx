import React, { useState, useEffect } from 'react';
import { getBookings, updateBooking, cancelBooking } from '../../services/bookingService';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const fetchedBookings = await getBookings('currentUserId'); // Replace with actual user ID
      setBookings(fetchedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateBooking(id, { status: newStatus });
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(id);
        fetchBookings();
      } catch (error) {
        console.error('Error canceling booking:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-purple-100">
            <th className="border p-2">Guest</th>
            <th className="border p-2">Property</th>
            <th className="border p-2">Check-in</th>
            <th className="border p-2">Check-out</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking: any) => (
            <tr key={booking.id}>
              <td className="border p-2">{booking.guest.name}</td>
              <td className="border p-2">{booking.property.title}</td>
              <td className="border p-2">{new Date(booking.checkIn).toLocaleDateString()}</td>
              <td className="border p-2">{new Date(booking.checkOut).toLocaleDateString()}</td>
              <td className="border p-2">{booking.status}</td>
              <td className="border p-2">
                <select 
                  value={booking.status} 
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  className="mr-2 p-1 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;