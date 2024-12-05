import React from 'react';
import { Calendar, Globe, PieChart, Layout, Wrench, Monitor, Map } from 'lucide-react';

const ForOwners = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Daily, Monthly & Yearly Rentals',
      description: 'Flexibility to choose the rental duration that best suits your property\'s potential.'
    },
    {
      icon: Globe,
      title: 'International Expert Management',
      description: 'Our global team of professionals manages your property efficiently, ensuring higher profitability.'
    },
    {
      icon: PieChart,
      title: 'Profit Sharing',
      description: 'Enjoy a significant share of the profits while we handle the complexities of management.'
    },
    {
      icon: Layout,
      title: 'Integrated Channel Manager',
      description: 'Sync prices and booking calendars across all platforms from one place.'
    },
    {
      icon: Wrench,
      title: 'Advanced Property Management',
      description: 'Access tools that make managing your property effortless.'
    },
    {
      icon: Monitor,
      title: 'Beautiful Guest Interface',
      description: 'Attract more guests with our user-friendly and visually appealing booking system.'
    },
    {
      icon: Map,
      title: 'Interactive Map View',
      description: 'Showcase your property on our map-based listings for better visibility.'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">For Property Owners</h2>
        <p className="text-xl text-center text-gray-600 mb-12">Host Your Property with Multi Options</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForOwners;