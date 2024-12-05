import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users } from 'lucide-react';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      location,
      checkIn,
      checkOut,
      guests: guests.toString()
    });
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-full shadow-lg p-2 flex items-center">
      <div className="flex-grow flex items-center border-r border-gray-300 pr-4">
        <Search className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="flex items-center border-r border-gray-300 px-4">
        <Calendar className="text-gray-400 mr-2" />
        <input
          type="date"
          placeholder="Check-in"
          className="outline-none"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      <div className="flex items-center border-r border-gray-300 px-4">
        <Calendar className="text-gray-400 mr-2" />
        <input
          type="date"
          placeholder="Check-out"
          className="outline-none"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>
      <div className="flex items-center px-4">
        <Users className="text-gray-400 mr-2" />
        <input
          type="number"
          min="1"
          placeholder="Guests"
          className="w-16 outline-none"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
        />
      </div>
      <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300">
        Search
      </button>
    </form>
  );
};

export default SearchBar;