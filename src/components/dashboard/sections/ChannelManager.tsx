import React, { useState, useEffect } from 'react';
import { syncChannels, getChannelStats, updateChannelPricing } from '../../../services/channelService';
import { ChannelStats } from '../../../types/dashboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChannelManager = () => {
  const [channelStats, setChannelStats] = useState<ChannelStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchChannelStats();
  }, []);

  const fetchChannelStats = async () => {
    try {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      const stats = await getChannelStats(startDate.toISOString(), new Date().toISOString());
      setChannelStats(stats);
    } catch (error) {
      console.error('Error fetching channel stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      await syncChannels();
      await fetchChannelStats();
    } catch (error) {
      console.error('Error syncing channels:', error);
    } finally {
      setSyncing(false);
    }
  };

  const handlePriceUpdate = async (platform: string, adjustment: number) => {
    try {
      await updateChannelPricing('property-id', {
        platform,
        adjustment
      });
      await fetchChannelStats();
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  };

  if (loading) {
    return <div>Loading channel data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Channel Manager</h2>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {syncing ? 'Syncing...' : 'Sync Channels'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Channel Performance</h3>
        <div className="h-64">
          <BarChart data={channelStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="platform" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="Bookings" />
            <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
          </BarChart>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {channelStats.map((channel) => (
          <div key={channel.platform} className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">{channel.platform}</h4>
            <div className="space-y-2">
              <p>Bookings: {channel.bookings}</p>
              <p>Revenue: ${channel.revenue}</p>
              <p>Occupancy Rate: {channel.occupancyRate}%</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handlePriceUpdate(channel.platform, -5)}
                  className="bg-red-100 text-red-600 px-2 py-1 rounded"
                >
                  -5%
                </button>
                <button
                  onClick={() => handlePriceUpdate(channel.platform, 5)}
                  className="bg-green-100 text-green-600 px-2 py-1 rounded"
                >
                  +5%
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelManager;