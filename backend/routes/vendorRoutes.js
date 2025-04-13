const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const Vehicle = require('../models/Vehicle'); // External vehicle collection
const multer = require('multer');
const path = require('path');

// 🔧 Multer setup for image upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

/* -------------------------------------------------------
   ✅ VENDOR REGISTRATION
-------------------------------------------------------- */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) return res.status(400).json({ message: 'Vendor already exists' });

    const newVendor = new Vendor({ name, email, password, phone });
    const savedVendor = await newVendor.save();

    res.status(201).json({ message: 'Vendor registered successfully', vendor: savedVendor });
  } catch (err) {
    res.status(500).json({ message: 'Error registering vendor', error: err.message });
  }
});

/* -------------------------------------------------------
   ✅ VENDOR LOGIN
-------------------------------------------------------- */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email, password });
    if (!vendor) return res.status(401).json({ message: 'Invalid email or password' });
    res.status(200).json({ message: 'Login successful', vendor });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

/* -------------------------------------------------------
   ✅ ADD VEHICLE (Pending Approval)
-------------------------------------------------------- */
router.post('/vehicles/:email', upload.single('img'), async (req, res) => {
  try {
    const { type, name, location, price, features } = req.body;
    const { email } = req.params;

    const imgPath = req.file ? req.file.filename : '';

    const newVehicle = new Vehicle({
      type,
      name,
      location,
      price,
      features,
      img: imgPath,
      vendorEmail: email,
    });

    await newVehicle.save();

    const allVehicles = await Vehicle.find({ vendorEmail: email, status: 'approved' });

    res.json({ message: "Vehicle added successfully", vehicles: allVehicles });
  } catch (err) {
    console.error("Error in adding vehicle:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


/* -------------------------------------------------------
   ✅ GET APPROVED VEHICLES FOR A VENDOR
-------------------------------------------------------- */
router.get('/vehicles/:email', async (req, res) => {
  const { email } = req.params;
  try {
    // Removed status filter here 👇
    const vehicles = await Vehicle.find({ vendorEmail: email });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles', error: err.message });
  }
});




/* -------------------------------------------------------
   ✅ REMOVE VEHICLE BY ID (if needed)
-------------------------------------------------------- */
// Delete a vehicle by ID for a specific vendor
router.delete('/:email/vehicles/:id', async (req, res) => {
  const { email, id } = req.params;
  try {
    await Vehicle.findOneAndDelete({ _id: id, vendorEmail: email });
    const updatedVehicles = await Vehicle.find({ vendorEmail: email });
    res.json({ message: "Vehicle deleted", vehicles: updatedVehicles });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting vehicle', error: err.message });
  }
});


module.exports = router;
