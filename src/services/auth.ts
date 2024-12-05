import { z } from 'zod';
import apiClient from './api/client';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const authService = {
  async login(data: LoginInput) {
    const response = await apiClient.post('/auth/login', data);
    localStorage.setItem('auth_token', response.data.token);
    return response.data;
  },

  async register(data: RegisterInput) {
    const { confirmPassword, ...registerData } = data;
    const response = await apiClient.post('/auth/register', registerData);
    localStorage.setItem('auth_token', response.data.token);
    return response.data;
  },

  async logout() {
    localStorage.removeItem('auth_token');
    await apiClient.post('/auth/logout');
  },

  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },
};
