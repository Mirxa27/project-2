import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  BarChart,
  Calendar,
  DollarSign,
  Home,
  MessageSquare,
  PieChart,
  Settings,
  Bell,
  Tool,
  TrendingUp
} from 'lucide-react';

import ChannelManager from './sections/ChannelManager';
import RevenueAnalytics from './sections/RevenueAnalytics';
import PerformanceMetrics from './sections/PerformanceMetrics';
import MaintenanceSchedule from './sections/MaintenanceSchedule';
import ExpenseTracker from './sections/ExpenseTracker';
import MarketAnalysis from './sections/MarketAnalysis';
import AlertCenter from './sections/AlertCenter';
import { getAlerts } from '../../services/alertService';
import { Alert } from '../../types/dashboard';

const HostDashboard = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const fetchedAlerts = await getAlerts();
      setAlerts(fetchedAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigationItems = [
    { path: 'channels', icon: Home, label: 'Channel Manager' },
    { path: 'revenue', icon: DollarSign, label: 'Revenue & Analytics' },
    { path: 'performance', icon: PieChart, label: 'Performance Metrics' },
    { path: 'maintenance', icon: Tool, label: 'Maintenance' },
    { path: 'expenses', icon: BarChart, label: 'Expenses' },
    { path: 'market', icon: TrendingUp, label: 'Market Analysis' },
    { path: 'alerts', icon: Bell, label: 'Alerts' },
    { path: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-2">
          {navigationItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={`/host-dashboard/${path}`}
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </aside>

        <main className="flex-1">
          <Routes>
            <Route path="channels" element={<ChannelManager />} />
            <Route path="revenue" element={<RevenueAnalytics />} />
            <Route path="performance" element={<PerformanceMetrics />} />
            <Route path="maintenance" element={<MaintenanceSchedule />} />
            <Route path="expenses" element={<ExpenseTracker />} />
            <Route path="market" element={<MarketAnalysis />} />
            <Route path="alerts" element={<AlertCenter alerts={alerts} onUpdate={fetchAlerts} />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default HostDashboard;