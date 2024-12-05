import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProfile from '../UserProfile';
import { AuthProvider } from '../../contexts/AuthContext';
import { vi } from 'vitest';

// Mock the auth context
vi.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    user: { name: 'John Doe', email: 'john@example.com' },
    logout: vi.fn(),
  }),
}));

// Mock the profile components
vi.mock('../../components/profile/ProfileForm', () => ({
  ProfileForm: () => <div data-testid="profile-form">Profile Form</div>,
}));

vi.mock('../../components/profile/BookingHistory', () => ({
  BookingHistory: () => <div data-testid="booking-history">Booking History</div>,
}));

vi.mock('../../components/profile/FavoriteProperties', () => ({
  FavoriteProperties: () => <div data-testid="favorite-properties">Favorite Properties</div>,
}));

vi.mock('../../components/profile/Settings', () => ({
  Settings: () => <div data-testid="settings">Settings</div>,
}));

describe('UserProfile', () => {
  const queryClient = new QueryClient();

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UserProfile />
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  it('renders user profile with correct initial tab', () => {
    renderComponent();
    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByText('Welcome back, John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('profile-form')).toBeInTheDocument();
  });

  it('switches tabs correctly', () => {
    renderComponent();

    // Click Bookings tab
    fireEvent.click(screen.getByText('Bookings'));
    expect(screen.getByTestId('booking-history')).toBeInTheDocument();

    // Click Favorites tab
    fireEvent.click(screen.getByText('Favorites'));
    expect(screen.getByTestId('favorite-properties')).toBeInTheDocument();

    // Click Settings tab
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.getByTestId('settings')).toBeInTheDocument();

    // Click back to Profile tab
    fireEvent.click(screen.getByText('Profile'));
    expect(screen.getByTestId('profile-form')).toBeInTheDocument();
  });

  it('handles logout', () => {
    const { useAuth } = require('../../contexts/AuthContext');
    const logout = vi.fn();
    useAuth.mockImplementation(() => ({
      user: { name: 'John Doe', email: 'john@example.com' },
      logout,
    }));

    renderComponent();
    fireEvent.click(screen.getByText('Sign Out'));
    expect(logout).toHaveBeenCalled();
  });
});
