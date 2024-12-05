import React from 'react';
import { TrendingUp, Globe, Shield, Cpu, Users } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: TrendingUp,
      title: 'Proven Track Record',
      description: 'Successfully managed properties yielding up to 6x more revenue than traditional methods.'
    },
    {
      icon: Globe,
      title: 'Global Expertise, Local Insights',
      description: 'An international team with deep understanding of local markets.'
    },
    {
      icon: Shield,
      title: 'Comprehensive Services',
      description: 'From property acquisition to full-scale management, we handle it all.'
    },
    {
      icon: Cpu,
      title: 'Advanced Technology',
      description: 'A platform equipped with features like channel management, interactive maps, and a beautiful booking interface.'
    },
    {
      icon: Users,
      title: 'Community Trust',
      description: 'Trusted by both international investors and local property owners.'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose HabibiStay</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <reason.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;