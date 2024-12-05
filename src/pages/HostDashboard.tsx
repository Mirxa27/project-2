import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, Home, MessageSquare, PieChart, Settings } from 'lucide-react';
import BookingManagement from '../components/dashboard/BookingManagement';
import PropertyManagement from '../components/dashboard/PropertyManagement';
import PriceSynchronization from '../components/dashboard/PriceSynchronization';
import AnalyticsReporting from '../components/dashboard/AnalyticsReporting';
import GuestCommunication from '../components/dashboard/GuestCommunication';
import AccountSettings from '../components/dashboard/AccountSettings';
import RevenueDashboard from '../components/dashboard/RevenueDashboard';

const HostDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();

  const tabs = [
    { id: 'bookings', icon: Calendar, label: 'Bookings', component: BookingManagement },
    { id: 'properties', icon: Home, label: 'Properties', component: PropertyManagement },
    { id: 'pricing', icon: DollarSign, label: 'Pricing', component: PriceSynchronization },
    { id: 'analytics', icon: PieChart, label: 'Analytics', component: AnalyticsReporting },
    { id: 'messages', icon: MessageSquare, label: 'Messages', component: GuestCommunication },
    { id: 'settings', icon: Settings, label: 'Settings', component: AccountSettings },
    { id: 'revenue', icon: DollarSign, label: 'Revenue', component: RevenueDashboard },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    navigate(`/host-dashboard/${id}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Host Dashboard</h1>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 pr-8 mb-8 md:mb-0">
          <nav>
            <ul>
              {tabs.map(({ id, icon: Icon, label }) => (
                <li key={id} className={`mb-2 ${activeTab === id ? 'font-bold' : ''}`}>
                  <Link 
                    to={`/host-dashboard/${id}`}
                    onClick={() => handleTabClick(id)}
                    className="flex items-center w-full text-left p-2 rounded hover:bg-purple-100"
                  >
                    <Icon className="mr-2" size={20} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="w-full md:w-3/4">
          <Routes>
            {tabs.map(({ id, component: Component }) => (
              <Route key={id} path={id} element={<Component />} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default HostDashboard;