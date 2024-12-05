export interface ChannelStats {
  platform: string;
  bookings: number;
  revenue: number;
  occupancyRate: number;
}

export interface PerformanceMetrics {
  totalRevenue: number;
  occupancyRate: number;
  averageDailyRate: number;
  reviewScore: number;
  bookingsCount: number;
  cancelationRate: number;
}

export interface MaintenanceTask {
  id: string;
  propertyId: string;
  type: 'cleaning' | 'repair' | 'inspection';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignedTo?: string;
  notes?: string;
}

export interface Expense {
  id: string;
  propertyId: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  receipt?: string;
}

export interface MarketData {
  averagePrice: number;
  occupancyRate: number;
  seasonalTrends: {
    month: string;
    averagePrice: number;
    demand: number;
  }[];
  competitors: {
    name: string;
    price: number;
    rating: number;
  }[];
}

export interface Alert {
  id: string;
  type: 'booking' | 'maintenance' | 'review' | 'financial';
  priority: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  read: boolean;
}