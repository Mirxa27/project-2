import express from 'express';
import { Property } from '../models/Property';
import { auth } from '../middleware/auth';
import { z } from 'zod';

const router = express.Router();

const propertyFilterSchema = z.object({
  minPrice: z.string().optional().transform(Number),
  maxPrice: z.string().optional().transform(Number),
  location: z.string().optional(),
  type: z.enum(['house', 'apartment', 'villa', 'cottage']).optional(),
  bedrooms: z.string().optional().transform(Number),
  bathrooms: z.string().optional().transform(Number),
  query: z.string().optional(),
});

// Get all properties with filters
router.get('/', async (req, res, next) => {
  try {
    const filters = propertyFilterSchema.parse(req.query);
    const query: any = {};

    if (filters.minPrice) query.price = { $gte: filters.minPrice };
    if (filters.maxPrice) query.price = { ...query.price, $lte: filters.maxPrice };
    if (filters.type) query.type = filters.type;
    if (filters.bedrooms) query.bedrooms = filters.bedrooms;
    if (filters.bathrooms) query.bathrooms = filters.bathrooms;
    if (filters.location) {
      query['location.city'] = new RegExp(filters.location, 'i');
    }
    if (filters.query) {
      query.$or = [
        { title: new RegExp(filters.query, 'i') },
        { description: new RegExp(filters.query, 'i') },
      ];
    }

    const properties = await Property.find(query).populate('host', 'name email');
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

// Get property by ID
router.get('/:id', async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate('host', 'name email');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    next(error);
  }
});

// Create property (requires authentication)
router.post('/', auth, async (req, res, next) => {
  try {
    const property = new Property({
      ...req.body,
      host: req.user?.userId,
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
});

// Update property (requires authentication)
router.put('/:id', auth, async (req, res, next) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      host: req.user?.userId,
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    Object.assign(property, req.body);
    await property.save();
    res.json(property);
  } catch (error) {
    next(error);
  }
});

// Delete property (requires authentication)
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      host: req.user?.userId,
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
