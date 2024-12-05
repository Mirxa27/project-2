import React, { useState } from 'react';

const AccountSettings = () => {
  const [name, setName] = useState('John Host');
  const [email, setEmail] = useState('john.host@example.com');
  const [phone, setPhone] = useState('+966 50 123 4567');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated information to a backend
    console.log('Account settings updated:', { name, email, phone, notifications });
    alert('Account settings updated successfully!');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Notification Preferences</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                className="mr-2"
              />
              Receive email notifications
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                className="mr-2"
              />
              Receive SMS notifications
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                className="mr-2"
              />
              Receive push notifications
            </label>
          </div>
        </div>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default AccountSettings;