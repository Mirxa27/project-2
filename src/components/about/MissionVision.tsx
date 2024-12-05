import React from 'react';
import { Target, Eye, Award } from 'lucide-react';

const MissionVision = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              To redefine property management and hosting by providing advanced, user-friendly, and profitable solutions for all stakeholders.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-600">
              We envision a world where property management is effortless, investments are meaningful, and guests have access to unparalleled accommodation options.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Award className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold">Our Values</h2>
            </div>
            <ul className="text-gray-600 space-y-2">
              <li>• Innovation</li>
              <li>• Integrity</li>
              <li>• Excellence</li>
              <li>• Collaboration</li>
              <li>• Customer-Centricity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;