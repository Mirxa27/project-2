import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  },
  amenities: [{
    type: String,
  }],
  images: [{
    type: String,
    validate: {
      validator: (v: string) => /^https?:\/\/.+/.test(v),
      message: 'Invalid image URL',
    },
  }],
  bedrooms: {
    type: Number,
    required: true,
    min: 1,
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0.5,
  },
  maxGuests: {
    type: Number,
    required: true,
    min: 1,
  },
  type: {
    type: String,
    required: true,
    enum: ['house', 'apartment', 'villa', 'cottage'],
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

propertySchema.index({ 'location.city': 1, 'location.state': 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ type: 1 });

export const Property = mongoose.model('Property', propertySchema);
