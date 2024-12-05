import axios from 'axios';
import { MaintenanceTask } from '../types/dashboard';

const API_URL = process.env.VITE_API_URL;

export const getMaintenanceTasks = async (propertyId: string): Promise<MaintenanceTask[]> => {
  try {
    const response = await axios.get(`${API_URL}/maintenance/tasks`, {
      params: { propertyId }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch maintenance tasks:', error);
    throw new Error('Unable to retrieve maintenance tasks');
  }
};

export const createMaintenanceTask = async (task: Omit<MaintenanceTask, 'id'>): Promise<MaintenanceTask> => {
  try {
    const response = await axios.post(`${API_URL}/maintenance/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('Failed to create maintenance task:', error);
    throw new Error('Unable to create maintenance task');
  }
};

export const updateMaintenanceTask = async (taskId: string, updates: Partial<MaintenanceTask>): Promise<MaintenanceTask> => {
  try {
    const response = await axios.patch(`${API_URL}/maintenance/tasks/${taskId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Failed to update maintenance task:', error);
    throw new Error('Unable to update maintenance task');
  }
};

export const getCleaningSchedule = async (propertyId: string, startDate: string, endDate: string) => {
  try {
    const response = await axios.get(`${API_URL}/maintenance/cleaning-schedule`, {
      params: { propertyId, startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cleaning schedule:', error);
    throw new Error('Unable to retrieve cleaning schedule');
  }
};