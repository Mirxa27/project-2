import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getBookings } from '../../services/bookingService';

const AnalyticsReporting = () => {
  const [bookingData, setBookingData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageOccupancy, setAverageOccupancy] = useState(0);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const bookings = await getBookings('currentUserId'); // Replace with actual user ID
      const processedData = processBookingData(bookings);
      setBookingData(processedData);
      calculateTotalRevenue(bookings);
      calculateAverageOccupancy(bookings);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  const processBookingData = (bookings: any[]) => {
    const monthlyData: { [key: string]: { bookings: number; revenue: number } } = {};
    
    bookings.forEach(booking => {
      const month = new Date(booking.checkIn).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) {
        monthlyData[month] = { bookings: 0, revenue: 0 };
      }
      monthlyData[month].bookings += 1;
      monthlyData[month].revenue += booking.totalPrice;
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      bookings: data.bookings,
      revenue: data.revenue
    }));
  };

  const calculateTotalRevenue = (bookings: any[]) => {
    const total = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    setTotalRevenue(total);
  };

  const calculateAverageOccupancy = (bookings: any[]) => {
    // This is a simplified calculation. In a real scenario, you'd need to consider
    // the total number of available days for all properties.
    const totalDays = bookings.reduce((sum, booking) => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      const days = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);
      return sum + days;
    }, 0);

    // Assuming 365 days per year and one property for simplicity
    const occupancyRate = (totalDays / 365) * 100;
    setAverageOccupancy(occupancyRate);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics and Reporting</h2>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Bookings and Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="Bookings" />
            <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-100 p-4 rounded">
            <h4 className="font-bold">Total Bookings</h4>
            <p className="text-2xl">{bookingData.reduce((sum, data) => sum + data.bookings, 0)}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded">
            <h4 className="font-bold">Average Occupancy Rate</h4>
            <p className="text-2xl">{averageOccupancy.toFixed(2)}%</p>
          </div>
          <div className="bg-purple-100 p-4 rounded">
            <h4 className="font-bold">Total Revenue</h4>
            <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReporting;