import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { searchProperties } from '../services/propertyService';

const Search = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    amenities: [],
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fetchProperties = async () => {
      const results = await searchProperties(searchParams.toString());
      setProperties(results);
    };
    fetchProperties();
  }, [location]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters(prev => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, name]
          : prev.amenities.filter(item => item !== name),
      }));
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
  };

  const applyFilters = () => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, Array.isArray(value) ? value.join(',') : value);
      } else {
        searchParams.delete(key);
      }
    });
    // Update the URL with new search params and trigger a new search
    window.history.pushState(null, '', `${location.pathname}?${searchParams.toString()}`);
    // Re-fetch properties with new filters
    searchProperties(searchParams.toString()).then(setProperties);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Price Range</label>
              <input
                type="number"
                name="priceMin"
                placeholder="Min"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="number"
                name="priceMax"
                placeholder="Max"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Amenities</label>
              {['Wi-Fi', 'Pool', 'Gym', 'Parking'].map(amenity => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    name={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  {amenity}
                </label>
              ))}
            </div>
            <button
              onClick={applyFilters}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Apply Filters
            </button>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;