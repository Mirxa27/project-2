import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    image: string;
    rating: number;
    reviews: Array<{ id: string; user: string; rating: number; comment: string; date: string }>;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/properties/${property.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
        <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
          <p className="text-gray-600 mb-2">{property.location}</p>
          <div className="flex items-center justify-between">
            <p className="text-purple-900 font-bold">${property.price} / night</p>
            <div className="flex items-center">
              <Star className="text-yellow-400 w-4 h-4 mr-1" />
              <span>{property.rating} ({property.reviews.length})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;