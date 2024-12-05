import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ForOwners from '../components/home/ForOwners';
import ForInvestors from '../components/home/ForInvestors';
import FeaturedListings from '../components/FeaturedListings';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ForOwners />
      <ForInvestors />
      <FeaturedListings />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default Home;