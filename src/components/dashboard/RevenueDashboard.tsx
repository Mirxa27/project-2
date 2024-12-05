import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getRevenueData, syncExternalPlatforms } from '../../services/revenueService';

const RevenueDashboard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchRevenueData();
  }, [startDate, endDate]);

  const fetchRevenueData = async () => {
    if (startDate && endDate) {
      try {
        const data = await getRevenueData(startDate, endDate);
        setRevenueData(data);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    }
  };

  const handleSyncExternalPlatforms = async () => {
    try {
      await syncExternalPlatforms();
      alert('External platforms synced successfully');
      fetchRevenueData();
    } catch (error) {
      console.error('Error syncing external platforms:', error);
      alert('Failed to sync external platforms');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Revenue Dashboard</h2>
      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSyncExternalPlatforms}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
        >
          Sync External Platforms
        </button>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Revenue by Platform</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="habibistay" fill="#8884d8" name="Habibistay" />
            <Bar dataKey="airbnb" fill="#82ca9d" name="Airbnb" />
            <Bar dataKey="bookingcom" fill="#ffc658" name="Booking.com" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Summary</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-100">
              <th className="border p-2">Platform</th>
              <th className="border p-2">Total Revenue</th>
              <th className="border p-2">Bookings</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.length > 0 && (
              <>
                <tr>
                  <td className="border p-2">Habibistay</td>
                  <td className="border p-2">${revenueData.reduce((sum, data) => sum + data.habibistay, 0).toFixed(2)}</td>
                  <td className="border p-2">{revenueData.reduce((sum, data) => sum + data.habibistayBookings, 0)}</td>
                </tr>
                <tr>
                  <td className="border p-2">Airbnb</td>
                  <td className="border p-2">${revenueData.reduce((sum, data) => sum + data.airbnb, 0).toFixed(2)}</td>
                  <td className="border p-2">{revenueData.reduce((sum, data) => sum + data.airbnbBookings, 0)}</td>
                </tr>
                <tr>
                  <td className="border p-2">Booking.com</td>
                  <td className="border p-2">${revenueData.reduce((sum, data) => sum + data.bookingcom, 0).toFixed(2)}</td>
                  <td className="border p-2">{revenueData.reduce((sum, data) => sum + data.bookingcomBookings, 0)}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueDashboard;