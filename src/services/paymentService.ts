import axios from 'axios';

const API_URL = 'https://api.habibistay.com'; // Replace with your actual API URL

export const createPaymentIntent = async (bookingId: string) => {
  try {
    const response = await axios.post(`${API_URL}/payments/create-intent`, { bookingId });
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const confirmPayment = async (paymentIntentId: string) => {
  try {
    const response = await axios.post(`${API_URL}/payments/confirm`, { paymentIntentId });
    return response.data;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

export const getPaymentHistory = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/payments/history?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
};