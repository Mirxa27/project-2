// Mock data for revenue
const mockRevenueData = [
  {
    date: '2024-03',
    habibistay: 5000,
    airbnb: 3500,
    bookingcom: 2500,
    habibistayBookings: 10,
    airbnbBookings: 7,
    bookingcomBookings: 5
  },
  {
    date: '2024-02',
    habibistay: 4500,
    airbnb: 3000,
    bookingcom: 2000,
    habibistayBookings: 9,
    airbnbBookings: 6,
    bookingcomBookings: 4
  },
  {
    date: '2024-01',
    habibistay: 4000,
    airbnb: 2800,
    bookingcom: 1800,
    habibistayBookings: 8,
    airbnbBookings: 5,
    bookingcomBookings: 3
  }
];

export const getRevenueData = async (startDate: string, endDate: string) => {
  try {
    // Return mock data instead of making API call
    return Promise.resolve(mockRevenueData);
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return [];
  }
};

export const syncExternalPlatforms = async () => {
  try {
    // Simulate successful sync
    return Promise.resolve({ success: true, message: 'Platforms synced successfully' });
  } catch (error) {
    console.error('Error syncing external platforms:', error);
    throw new Error('Failed to sync external platforms');
  }
};