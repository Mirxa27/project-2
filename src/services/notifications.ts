import apiClient from './api/client';
import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.string(),
  type: z.enum(['booking', 'message', 'system']),
  title: z.string(),
  message: z.string(),
  read: z.boolean(),
  createdAt: z.string(),
  data: z.record(z.any()).optional(),
});

export type Notification = z.infer<typeof notificationSchema>;

export const notificationService = {
  async getNotifications() {
    const response = await apiClient.get('/notifications');
    return response.data;
  },

  async markAsRead(notificationId: string) {
    const response = await apiClient.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },

  async markAllAsRead() {
    const response = await apiClient.post('/notifications/mark-all-read');
    return response.data;
  },

  async deleteNotification(notificationId: string) {
    await apiClient.delete(`/notifications/${notificationId}`);
  },

  async updateNotificationPreferences(preferences: {
    emailNotifications: boolean;
    bookingUpdates: boolean;
    promotionalEmails: boolean;
  }) {
    const response = await apiClient.put('/notifications/preferences', preferences);
    return response.data;
  },
};
