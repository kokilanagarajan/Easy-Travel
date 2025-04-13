const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const mongoose = require("mongoose");

// ✅ Admin Login (Dummy Check)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "admineasytravel" && password === "easy") {
    return res.status(200).json({ message: "Admin login successful", role: "admin" });
  } else {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }
});

// ✅ Get all pending vehicles


// ✅ Approve vehicle
// Approve a vehicle
router.patch('/approved/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Error approving vehicle', error: err.message });
  }
});


// ✅ Reject vehicle
// In admin.js (routes)
router.patch('/rejected/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Error updating vehicle status', error: err.message });
  }
});



// routes/adminRoutes.js
router.get('/pending-vehicles', async (req, res) => {
  const vehicles = await Vehicle.find({ status: 'pending' });
  res.json(vehicles);
});

// routes/adminRoutes.js
router.put('/vehicle/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "approved" or "rejected"

  const updated = await Vehicle.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updated);
});



module.exports = router;
