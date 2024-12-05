import React from 'react'
import { Link } from 'react-router-dom'

const listings = [
  {
    id: 1,
    title: 'Luxury Villa in Riyadh',
    location: 'Riyadh, Saudi Arabia',
    price: 500,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 2,
    title: 'Modern Apartment in Jeddah',
    location: 'Jeddah, Saudi Arabia',
    price: 200,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 3,
    title: 'Traditional House in Al-Ula',
    location: 'Al-Ula, Saudi Arabia',
    price: 300,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  }
]

const FeaturedListings = () => {
  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold mb-8 text-purple-900">Featured Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
              <p className="text-gray-600 mb-2">{listing.location}</p>
              <p className="text-purple-900 font-bold">${listing.price} / night</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/properties" className="bg-purple-900 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-purple-800 transition duration-300">
          View All Properties
        </Link>
      </div>
    </div>
  )
}

export default FeaturedListings