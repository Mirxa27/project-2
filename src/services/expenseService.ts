import axios from 'axios';
import { Expense } from '../types/dashboard';

const API_URL = process.env.VITE_API_URL;

export const trackExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
  try {
    const response = await axios.post(`${API_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    console.error('Failed to track expense:', error);
    throw new Error('Unable to track expense');
  }
};

export const getExpenses = async (propertyId: string, startDate: string, endDate: string): Promise<Expense[]> => {
  try {
    const response = await axios.get(`${API_URL}/expenses`, {
      params: { propertyId, startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch expenses:', error);
    throw new Error('Unable to retrieve expenses');
  }
};

export const calculateProfitMargins = async (propertyId: string, period: string) => {
  try {
    const response = await axios.get(`${API_URL}/expenses/profit-margins`, {
      params: { propertyId, period }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to calculate profit margins:', error);
    throw new Error('Unable to calculate profit margins');
  }
};

export const uploadReceipt = async (expenseId: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append('receipt', file);
    
    const response = await axios.post(`${API_URL}/expenses/${expenseId}/receipt`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to upload receipt:', error);
    throw new Error('Unable to upload receipt');
  }
};