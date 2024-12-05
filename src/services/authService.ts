import apiClient from './api/client';
import { z } from 'zod';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';
const TOKEN_EXPIRY = 'token_expiry';

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['user', 'host', 'admin']),
  profileImage: z.string().url().optional(),
});

export type User = z.infer<typeof userSchema> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    const expiryTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    localStorage.setItem(TOKEN_EXPIRY, expiryTime.toString());
    return response.user;
  } catch (error: any) {
    if (error.message === 'Network Error') {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    throw error;
  }
};

export const register = async (name: string, email: string, password: string, role: 'user' | 'host') => {
  try {
    const response = await apiClient.post('/auth/register', {
      name,
      email,
      password,
      role,
    });
    return response;
  } catch (error: any) {
    if (error.message === 'Network Error') {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_EXPIRY);
};

export const getCurrentUser = async () => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  
  // Check token expiration
  const expiry = localStorage.getItem(TOKEN_EXPIRY);
  if (expiry && new Date().getTime() > parseInt(expiry)) {
    logout();
    return null;
  }

  try {
    // Verify the token with the server
    const response = await apiClient.get('/auth/me');
    return response;
  } catch (error) {
    logout();
    return null;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY);
  
  if (!token || !expiry) {
    return false;
  }
  
  // Check if token has expired
  if (new Date().getTime() > parseInt(expiry)) {
    logout();
    return false;
  }
  
  return true;
};

export const updateUserProfile = async (data: { name?: string; profileImage?: string }) => {
  try {
    const response = await apiClient.put('/auth/profile', data);
    const user = response;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  } catch (error: any) {
    if (error.message === 'Network Error') {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    throw error;
  }
};