import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Get in Touch</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Mail className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a href="mailto:info@habibistay.com" className="text-purple-600 hover:text-purple-700">
                info@habibistay.com
              </a>
            </div>
            <div className="flex flex-col items-center text-center">
              <Phone className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <a href="tel:+966550080669" className="text-purple-600 hover:text-purple-700">
                +966 55 008 0669
              </a>
            </div>
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p>Aljazeera Street,<br />Riyadh, Saudi Arabia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;