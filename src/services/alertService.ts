import axios from 'axios';
import { Alert } from '../types/dashboard';

const API_URL = process.env.VITE_API_URL;

export const getAlerts = async (): Promise<Alert[]> => {
  try {
    const response = await axios.get(`${API_URL}/alerts`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch alerts:', error);
    throw new Error('Unable to retrieve alerts');
  }
};

export const markAlertAsRead = async (alertId: string): Promise<Alert> => {
  try {
    const response = await axios.patch(`${API_URL}/alerts/${alertId}/read`);
    return response.data;
  } catch (error) {
    console.error('Failed to mark alert as read:', error);
    throw new Error('Unable to update alert');
  }
};

export const configureAlerts = async (settings: any) => {
  try {
    const response = await axios.post(`${API_URL}/alerts/configure`, settings);
    return response.data;
  } catch (error) {
    console.error('Failed to configure alerts:', error);
    throw new Error('Unable to configure alerts');
  }
};

export const subscribeToNotifications = async (subscription: PushSubscription) => {
  try {
    const response = await axios.post(`${API_URL}/alerts/subscribe`, subscription);
    return response.data;
  } catch (error) {
    console.error('Failed to subscribe to notifications:', error);
    throw new Error('Unable to subscribe to notifications');
  }
};