import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  bookingUpdates: z.boolean(),
  promotionalEmails: z.boolean(),
});

type PasswordFormData = z.infer<typeof passwordSchema>;
type NotificationSettings = z.infer<typeof notificationSchema>;

export function Settings() {
  const { updatePassword, updateNotificationSettings, user } = useAuth();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const {
    register: registerNotifications,
    handleSubmit: handleNotificationsSubmit,
    formState: { isSubmitting: isNotificationsSubmitting },
  } = useForm<NotificationSettings>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: user?.settings?.emailNotifications ?? true,
      bookingUpdates: user?.settings?.bookingUpdates ?? true,
      promotionalEmails: user?.settings?.promotionalEmails ?? false,
    },
  });

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      await updatePassword(data.currentPassword, data.newPassword);
      toast.success('Password updated successfully');
      resetPassword();
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  const onNotificationsSubmit = async (data: NotificationSettings) => {
    try {
      await updateNotificationSettings(data);
      toast.success('Notification settings updated');
    } catch (error) {
      toast.error('Failed to update notification settings');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="password"
                label="Current Password"
                {...registerPassword('currentPassword')}
                error={passwordErrors.currentPassword?.message}
              />
            </div>
            <div>
              <Input
                type="password"
                label="New Password"
                {...registerPassword('newPassword')}
                error={passwordErrors.newPassword?.message}
              />
            </div>
            <div>
              <Input
                type="password"
                label="Confirm New Password"
                {...registerPassword('confirmPassword')}
                error={passwordErrors.confirmPassword?.message}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPasswordSubmitting}>
              {isPasswordSubmitting ? 'Updating...' : 'Update Password'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <form onSubmit={handleNotificationsSubmit(onNotificationsSubmit)}>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Email Notifications
                <p className="text-sm text-muted-foreground">
                  Receive important updates about your account
                </p>
              </label>
              <input
                type="checkbox"
                {...registerNotifications('emailNotifications')}
                className="h-4 w-4 rounded border-gray-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Booking Updates
                <p className="text-sm text-muted-foreground">
                  Get notified about your booking status changes
                </p>
              </label>
              <input
                type="checkbox"
                {...registerNotifications('bookingUpdates')}
                className="h-4 w-4 rounded border-gray-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Promotional Emails
                <p className="text-sm text-muted-foreground">
                  Receive offers and updates about new properties
                </p>
              </label>
              <input
                type="checkbox"
                {...registerNotifications('promotionalEmails')}
                className="h-4 w-4 rounded border-gray-300"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isNotificationsSubmitting}>
              {isNotificationsSubmitting ? 'Saving...' : 'Save Preferences'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
