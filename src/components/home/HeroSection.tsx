import React from 'react';
import SearchBar from '../SearchBar';

const HeroSection = () => {
  return (
    <div className="relative h-[600px] bg-cover bg-center" 
         style={{backgroundImage: 'url("https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to HabibiStay</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            More advanced than Airbnb and other OTAs. We revolutionize property hosting and management by offering unparalleled services that go beyond traditional platforms.
          </p>
          <div className="w-full max-w-4xl">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;