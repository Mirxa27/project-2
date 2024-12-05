import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationsList } from '../NotificationsList';
import { notificationService } from '../../../services/notifications';
import { beforeEach, expect, vi } from 'vitest';

// Mock the notification service
vi.mock('../../../services/notifications', () => ({
  notificationService: {
    getNotifications: vi.fn(),
    markAsRead: vi.fn(),
    deleteNotification: vi.fn(),
    markAllAsRead: vi.fn(),
  },
}));
/**
 * describe
 */
describe('NotificationsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const mockNotifications = [
    {
      id: '1',
      type: 'booking',
      title: 'New Booking',
      message: 'You have a new booking request',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'system',
      title: 'System Update',
      message: 'System maintenance scheduled',
      read: true,
      createdAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (notificationService.getNotifications as any).mockResolvedValue(mockNotifications);
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <NotificationsList />
      </QueryClientProvider>
    );
  };

  it('renders loading state initially', () => {
    renderComponent();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders notifications when data is loaded', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('New Booking')).toBeInTheDocument();
      expect(screen.getByText('System Update')).toBeInTheDocument();
    });
  });

  it('marks notification as read when clicking check button', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('New Booking')).toBeInTheDocument();
    });

    const markAsReadButton = screen.getAllByRole('button')[1]; // First button is "Mark all as read"
    fireEvent.click(markAsReadButton);

    await waitFor(() => {
      expect(notificationService.markAsRead).toHaveBeenCalledWith('1');
    });
  });

  it('deletes notification when clicking delete button', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('New Booking')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button').filter(
      button => button.getAttribute('aria-label') === 'Delete notification'
    );
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(notificationService.deleteNotification).toHaveBeenCalledWith('1');
    });
  });

  it('marks all notifications as read', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Mark all as read')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Mark all as read'));

    await waitFor(() => {
      expect(notificationService.markAllAsRead).toHaveBeenCalled();
    });
  });

  it('renders empty state when no notifications', async () => {
    (notificationService.getNotifications as any).mockResolvedValue([]);
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('No notifications')).toBeInTheDocument();
      expect(screen.getByText("You're all caught up! Check back later for new notifications.")).toBeInTheDocument();
    });
  });
});
