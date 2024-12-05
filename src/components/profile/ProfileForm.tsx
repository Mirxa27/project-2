import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { user, updateProfile } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div>
            <Input
              label="Name"
              {...register('name')}
              error={errors.name?.message}
            />
          </div>
          <div>
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>
          <div>
            <Input
              label="Phone"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              className="mt-1 w-full rounded-md border p-2"
              rows={4}
              {...register('bio')}
            />
            {errors.bio?.message && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
