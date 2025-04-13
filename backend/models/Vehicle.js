const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  type: String,
  name: String,
  location: String,
  price: String,
  features: String,
  img: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  vendorEmail: String, // 🔗 Vendor reference
});

module.exports = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
