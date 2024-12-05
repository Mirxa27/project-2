import express from 'express';
import { Booking } from '../models/Booking';
import { Property } from '../models/Property';
import { auth } from '../middleware/auth';
import { z } from 'zod';

const router = express.Router();

const createBookingSchema = z.object({
  propertyId: z.string(),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  guests: z.number().int().positive(),
});

// Get user's bookings
router.get('/', auth, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user?.userId })
      .populate('property')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user?.userId,
    }).populate('property');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
});

// Create booking
router.post('/', auth, async (req, res, next) => {
  try {
    const data = createBookingSchema.parse(req.body);
    
    // Check if property exists
    const property = await Property.findById(data.propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if dates are available
    const conflictingBooking = await Booking.findOne({
      property: data.propertyId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          startDate: { $lte: data.endDate },
          endDate: { $gte: data.startDate },
        },
      ],
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Property is not available for these dates' });
    }

    // Calculate total price (simplified)
    const days = Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * property.price;

    const booking = new Booking({
      ...data,
      property: data.propertyId,
      user: req.user?.userId,
      totalPrice,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

// Cancel booking
router.post('/:id/cancel', auth, async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user?.userId,
      status: { $ne: 'cancelled' },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (error) {
    next(error);
  }
});

// Get booking statistics (for hosts)
router.get('/stats/overview', auth, async (req, res, next) => {
  try {
    const properties = await Property.find({ host: req.user?.userId });
    const propertyIds = properties.map(p => p._id);

    const stats = await Booking.aggregate([
      {
        $match: {
          property: { $in: propertyIds },
          status: { $ne: 'cancelled' },
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    res.json(stats);
  } catch (error) {
    next(error);
  }
});

export default router;
