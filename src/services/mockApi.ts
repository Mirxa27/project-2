import { v4 as uuidv4 } from 'uuid';

// Sample data
let users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password', userType: 'host' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password', userType: 'guest' },
];

let properties = [
  {
    id: '1',
    title: 'Luxury Villa in Riyadh',
    description: 'Beautiful villa with a pool',
    price: 500,
    location: 'Riyadh, Saudi Arabia',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    rating: 4.5,
    reviews: [
      { id: '1', user: 'Jane Smith', rating: 5, comment: 'Amazing stay!', date: '2023-05-01' },
    ],
    amenities: ['Wi-Fi', 'Pool', 'Air Conditioning'],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    hostId: '1',
  },
];

let bookings = [];

// Mock API functions
export const mockLogin = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { token: 'mock-token', user: { ...user, password: undefined } };
  }
  throw new Error('Invalid credentials');
};

export const mockRegister = (name, email, password, userType) => {
  if (users.some(u => u.email === email)) {
    throw new Error('Email already in use');
  }
  const newUser = { id: uuidv4(), name, email, password, userType };
  users.push(newUser);
  return { ...newUser, password: undefined };
};

export const mockGetProperties = () => {
  return properties;
};

export const mockGetProperty = (id) => {
  const property = properties.find(p => p.id === id);
  if (!property) {
    throw new Error('Property not found');
  }
  return property;
};

export const mockCreateProperty = (propertyData) => {
  const newProperty = { ...propertyData, id: uuidv4() };
  properties.push(newProperty);
  return newProperty;
};

export const mockUpdateProperty = (id, propertyData) => {
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Property not found');
  }
  properties[index] = { ...properties[index], ...propertyData };
  return properties[index];
};

export const mockDeleteProperty = (id) => {
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Property not found');
  }
  properties.splice(index, 1);
};

export const mockCreateBooking = (bookingData) => {
  const newBooking = { ...bookingData, id: uuidv4() };
  bookings.push(newBooking);
  return newBooking;
};

export const mockGetBookings = (userId) => {
  return bookings.filter(b => b.userId === userId || b.hostId === userId);
};

export const mockUpdateBooking = (id, bookingData) => {
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) {
    throw new Error('Booking not found');
  }
  bookings[index] = { ...bookings[index], ...bookingData };
  return bookings[index];
};

export const mockCancelBooking = (id) => {
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) {
    throw new Error('Booking not found');
  }
  bookings[index].status = 'cancelled';
  return bookings[index];
};