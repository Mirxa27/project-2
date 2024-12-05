import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">{review.user}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 mb-2">{review.comment}</p>
          <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;