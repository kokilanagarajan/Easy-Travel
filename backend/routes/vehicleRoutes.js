const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle'); // adjust path if needed

router.get('/approved', async (req, res) => {
  try {
    const approvedVehicles = await Vehicle.find({ status: 'approved' });
    res.json(approvedVehicles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicles', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
      res.json(vehicle);
    } catch (err) {
      res.status(500).json({ message: "Error fetching vehicle", error: err.message });
    }
  });
  

module.exports = router;
