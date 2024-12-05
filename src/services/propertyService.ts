import { mockGetProperties, mockGetProperty, mockCreateProperty, mockUpdateProperty, mockDeleteProperty } from './mockApi';

const validateProperty = (propertyData: any) => {
  const requiredFields = ['title', 'description', 'price', 'location'];
  const missingFields = requiredFields.filter(field => !propertyData[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  if (propertyData.price <= 0) {
    throw new Error('Price must be greater than 0');
  }
  
  if (propertyData.maxGuests && propertyData.maxGuests <= 0) {
    throw new Error('Maximum guests must be greater than 0');
  }
};

export const getProperties = async () => {
  try {
    const properties = await mockGetProperties();
    return properties.map((property: any) => ({
      ...property,
      price: Number(property.price),
      maxGuests: Number(property.maxGuests || 1)
    }));
  } catch (error: any) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties. Please try again later.');
  }
};

export const getProperty = async (id: string) => {
  try {
    const property = await mockGetProperty(id);
    return {
      ...property,
      price: Number(property.price),
      maxGuests: Number(property.maxGuests || 1)
    };
  } catch (error: any) {
    console.error(`Error fetching property ${id}:`, error);
    throw new Error('Failed to fetch property details. Please try again later.');
  }
};

export const createProperty = async (propertyData: any) => {
  try {
    validateProperty(propertyData);
    const property = await mockCreateProperty(propertyData);
    return {
      ...property,
      price: Number(property.price),
      maxGuests: Number(property.maxGuests || 1)
    };
  } catch (error: any) {
    console.error('Error creating property:', error);
    throw error;
  }
};

export const updateProperty = async (id: string, propertyData: any) => {
  try {
    const currentProperty = await getProperty(id);
    const updatedData = { ...currentProperty, ...propertyData };
    validateProperty(updatedData);
    
    const property = await mockUpdateProperty(id, updatedData);
    return {
      ...property,
      price: Number(property.price),
      maxGuests: Number(property.maxGuests || 1)
    };
  } catch (error: any) {
    console.error(`Error updating property ${id}:`, error);
    throw error;
  }
};

export const deleteProperty = async (id: string) => {
  try {
    // Check if property has active bookings
    const bookings = await import('./bookingService').then(m => m.getBookings(''));
    const activeBookings = bookings.filter((booking: any) => 
      booking.propertyId === id && 
      new Date(booking.checkOut) > new Date()
    );
    
    if (activeBookings.length > 0) {
      throw new Error('Cannot delete property with active bookings');
    }
    
    await mockDeleteProperty(id);
  } catch (error: any) {
    console.error(`Error deleting property ${id}:`, error);
    throw error;
  }
};

export const uploadPropertyMedia = async (propertyId: string, formData: FormData) => {
  try {
    // Validate file types and sizes
    const files = Array.from(formData.getAll('media') as File[]);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
    
    files.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`);
      }
      if (file.size > maxSize) {
        throw new Error(`File ${file.name} exceeds maximum size of 5MB`);
      }
    });
    
    // Mock implementation - just return a success message
    return { message: 'Media uploaded successfully' };
  } catch (error: any) {
    console.error('Error uploading media:', error);
    throw error;
  }
};

export const searchProperties = async (searchParams: string) => {
  try {
    const properties = await mockGetProperties();
    const params = new URLSearchParams(searchParams);
    
    return properties.filter((property: any) => {
      let matches = true;
      
      if (params.has('location')) {
        matches = matches && property.location.toLowerCase().includes(params.get('location')!.toLowerCase());
      }
      
      if (params.has('priceMin')) {
        matches = matches && property.price >= Number(params.get('priceMin'));
      }
      
      if (params.has('priceMax')) {
        matches = matches && property.price <= Number(params.get('priceMax'));
      }
      
      if (params.has('bedrooms')) {
        matches = matches && property.bedrooms === Number(params.get('bedrooms'));
      }
      
      if (params.has('amenities')) {
        const requiredAmenities = params.get('amenities')!.split(',');
        matches = matches && requiredAmenities.every(amenity => 
          property.amenities.includes(amenity)
        );
      }
      
      return matches;
    });
  } catch (error: any) {
    console.error('Error searching properties:', error);
    throw new Error('Failed to search properties. Please try again later.');
  }
};