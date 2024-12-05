import axios from 'axios';
import { ChannelStats } from '../types/dashboard';

const API_URL = process.env.VITE_API_URL;

export const syncChannels = async () => {
  try {
    const response = await axios.post(`${API_URL}/channels/sync`, {
      platforms: ['airbnb', 'booking.com', 'vrbo']
    });
    return response.data;
  } catch (error) {
    console.error('Channel sync failed:', error);
    throw new Error('Failed to sync channel data');
  }
};

export const getChannelStats = async (startDate: string, endDate: string): Promise<ChannelStats[]> => {
  try {
    const response = await axios.get(`${API_URL}/channels/stats`, {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch channel stats:', error);
    throw new Error('Unable to retrieve channel statistics');
  }
};

export const updateChannelPricing = async (propertyId: string, updates: any) => {
  try {
    const response = await axios.post(`${API_URL}/channels/pricing`, {
      propertyId,
      updates
    });
    return response.data;
  } catch (error) {
    console.error('Price update failed:', error);
    throw new Error('Failed to update channel pricing');
  }
};

export const syncAvailability = async (propertyId: string) => {
  try {
    const response = await axios.post(`${API_URL}/channels/availability/sync`, {
      propertyId
    });
    return response.data;
  } catch (error) {
    console.error('Availability sync failed:', error);
    throw new Error('Failed to sync availability');
  }
};