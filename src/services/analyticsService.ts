import axios from 'axios';
import { PerformanceMetrics, MarketData } from '../types/dashboard';

const API_URL = process.env.VITE_API_URL;

export const getPerformanceMetrics = async (
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<PerformanceMetrics> => {
  try {
    const response = await axios.get(`${API_URL}/analytics/performance`, {
      params: { propertyId, startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch performance metrics:', error);
    throw new Error('Unable to retrieve performance data');
  }
};

export const getMarketAnalysis = async (
  propertyId: string,
  radius: number
): Promise<MarketData> => {
  try {
    const response = await axios.get(`${API_URL}/analytics/market`, {
      params: { propertyId, radius }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch market analysis:', error);
    throw new Error('Unable to retrieve market data');
  }
};

export const generateFinancialReport = async (
  propertyId: string,
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axios.get(`${API_URL}/analytics/financial-report`, {
      params: { propertyId, startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to generate financial report:', error);
    throw new Error('Unable to generate report');
  }
};

export const getForecast = async (propertyId: string, months: number) => {
  try {
    const response = await axios.get(`${API_URL}/analytics/forecast`, {
      params: { propertyId, months }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get forecast:', error);
    throw new Error('Unable to generate forecast');
  }
};