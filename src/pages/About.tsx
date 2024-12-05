import React from 'react';
import AboutHero from '../components/about/AboutHero';
import MissionVision from '../components/about/MissionVision';
import OurStory from '../components/about/OurStory';
import WhyChooseUs from '../components/about/WhyChooseUs';
import ContactSection from '../components/about/ContactSection';

const About = () => {
  return (
    <div className="bg-white">
      <AboutHero />
      <MissionVision />
      <OurStory />
      <WhyChooseUs />
      <ContactSection />
    </div>
  );
};

export default About;