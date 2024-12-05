import React, { useState, useEffect, useRef } from 'react';
import { getProperties, createProperty, updateProperty, deleteProperty, uploadPropertyMedia } from '../../services/propertyService';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({ title: '', description: '', price: '', type: '', bedrooms: '', bathrooms: '', maxGuests: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const fetchedProperties = await getProperties();
      setProperties(fetchedProperties);
      setError('');
    } catch (err) {
      setError('Failed to fetch properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createProperty(newProperty);
      setNewProperty({ title: '', description: '', price: '', type: '', bedrooms: '', bathrooms: '', maxGuests: '' });
      fetchProperties();
    } catch (err) {
      setError('Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProperty = async (id: string, updatedData: any) => {
    try {
      setLoading(true);
      await updateProperty(id, updatedData);
      fetchProperties();
    } catch (err) {
      setError('Failed to update property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        setLoading(true);
        await deleteProperty(id);
        fetchProperties();
      } catch (err) {
        setError('Failed to delete property. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload = async (propertyId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('media', files[i]);
      }

      try {
        setLoading(true);
        await uploadPropertyMedia(propertyId, formData);
        alert('Media uploaded successfully');
        fetchProperties();
      } catch (err) {
        setError('Failed to upload media. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Property Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAddProperty} className="mb-8 space-y-4">
        <input
          type="text"
          name="title"
          value={newProperty.title}
          onChange={handleInputChange}
          placeholder="Property Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={newProperty.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          value={newProperty.price}
          onChange={handleInputChange}
          placeholder="Price per night"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="type"
          value={newProperty.type}
          onChange={handleInputChange}
          placeholder="Property Type"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="bedrooms"
          value={newProperty.bedrooms}
          onChange={handleInputChange}
          placeholder="Number of Bedrooms"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="bathrooms"
          value={newProperty.bathrooms}
          onChange={handleInputChange}
          placeholder="Number of Bathrooms"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="maxGuests"
          value={newProperty.maxGuests}
          onChange={handleInputChange}
          placeholder="Maximum number of guests"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Add Property
        </button>
      </form>

      <div className="space-y-4">
        {properties.map((property: any) => (
          <div key={property.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
            <p className="mb-2">{property.description}</p>
            <p className="mb-2">Price: ${property.price} per night</p>
            <p className="mb-2">Type: {property.type}</p>
            <p className="mb-2">Bedrooms: {property.bedrooms}</p>
            <p className="mb-2">Bathrooms: {property.bathrooms}</p>
            <p className="mb-2">Max Guests: {property.maxGuests}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdateProperty(property.id, { ...property, price: Number(property.price) + 10 })}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Update Price
              </button>
              <button
                onClick={() => handleDeleteProperty(property.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Upload Pictures/Videos</h4>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileUpload(property.id, e)}
                multiple
                accept="image/*,video/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                Select Files
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyManagement;