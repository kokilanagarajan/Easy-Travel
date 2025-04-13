const express = require('express');
const router = express.Router(); // ✅ You missed this line
const Booking = require('../models/Booking'); // or wherever your model is

router.post('/', async (req, res) => {
    try {
 // Add this line
      const booking = new Booking(req.body);
      await booking.save();
      res.status(201).json(booking);
    } catch (err) {
      console.error('Booking failed:', err); // This should show up in your terminal
      res.status(500).json({ message: 'Booking failed', error: err.message });
    }
  });

  // GET bookings for a specific vehicle
router.get('/vehicle/:vehicleId', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const bookings = await Booking.find({ vehicleId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

  module.exports = router;

  