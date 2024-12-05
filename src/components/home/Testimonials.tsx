import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John D.',
      role: 'Property Owner',
      quote: 'Since partnering with HabibiStay, my property\'s earnings have tripled. Their management team is exceptional.'
    },
    {
      name: 'Sarah L.',
      role: 'Investor',
      quote: 'HabibiStay made investing in Saudi real estate effortless. They managed everything while I enjoyed the returns.'
    }
  ];

  return (
    <div className="py-20 bg-purple-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-purple-800 p-8 rounded-lg relative">
              <Quote className="w-12 h-12 text-purple-500 absolute -top-6 -left-6" />
              <p className="text-lg mb-4">{testimonial.quote}</p>
              <div className="mt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-purple-300">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;