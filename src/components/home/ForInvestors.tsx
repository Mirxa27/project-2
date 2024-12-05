import React from 'react';
import { Building, Shield, TrendingUp } from 'lucide-react';

const ForInvestors = () => {
  const benefits = [
    {
      icon: Building,
      title: 'Premium Property Selection',
      description: 'We identify the most appreciative properties for lucrative investments.'
    },
    {
      icon: Shield,
      title: 'Full Management Services',
      description: 'Not planning to live in Saudi Arabia? We manage your property entirely, making your investment meaningful.'
    },
    {
      icon: TrendingUp,
      title: 'High Returns on Investment',
      description: 'Benefit from our proven track record of generating higher profits.'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">For Investors</h2>
        <p className="text-xl text-center text-gray-600 mb-12">Exclusive Opportunities for International Investors</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md">
              <benefit.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForInvestors;