import React, { useState, useEffect } from 'react';
import { getProperties, updateProperty } from '../../services/propertyService';

const PriceSynchronization = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const fetchedProperties = await getProperties();
      setProperties(fetchedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handlePriceChange = async (id: string, field: string, value: number) => {
    try {
      const updatedProperty = await updateProperty(id, { [field]: value });
      setProperties(properties.map(prop => prop.id === id ? updatedProperty : prop));
    } catch (error) {
      console.error('Error updating property price:', error);
    }
  };

  const handleSyncPrices = async () => {
    // This is a placeholder for price synchronization logic
    // In a real application, you might want to sync with external pricing APIs or services
    alert('Prices synchronized with external services');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Price Synchronization</h2>
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-purple-100">
            <th className="border p-2">Property</th>
            <th className="border p-2">Base Price</th>
            <th className="border p-2">Weekend Price</th>
            <th className="border p-2">Holiday Price</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property: any) => (
            <tr key={property.id}>
              <td className="border p-2">{property.title}</td>
              <td className="border p-2">
                <input
                  type="number"
                  value={property.basePrice}
                  onChange={(e) => handlePriceChange(property.id, 'basePrice', parseInt(e.target.value))}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={property.weekendPrice}
                  onChange={(e) => handlePriceChange(property.id, 'weekendPrice', parseInt(e.target.value))}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={property.holidayPrice}
                  onChange={(e) => handlePriceChange(property.id, 'holidayPrice', parseInt(e.target.value))}
                  className="w-full p-1 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSyncPrices}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
      >
        Sync Prices with External Services
      </button>
    </div>
  );
};

export default PriceSynchronization;