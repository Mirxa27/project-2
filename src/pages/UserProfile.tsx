import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings as SettingsIcon, Heart, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProfileForm } from '../components/profile/ProfileForm';
import { BookingHistory } from '../components/profile/BookingHistory';
import { FavoriteProperties } from '../components/profile/FavoriteProperties';
import { Settings } from '../components/profile/Settings';
import { useAuth } from '../contexts/AuthContext';

type Tab = 'profile' | 'bookings' | 'favorites' | 'settings';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  { id: 'bookings', label: 'Bookings', icon: <Calendar size={20} /> },
  { id: 'favorites', label: 'Favorites', icon: <Heart size={20} /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
];

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">My Account</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back, {user?.name}
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <Card className="h-fit p-2">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        <main>
          {activeTab === 'profile' && <ProfileForm />}
          {activeTab === 'bookings' && <BookingHistory />}
          {activeTab === 'favorites' && <FavoriteProperties />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}