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
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
});

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  
  vehicles: [vehicleSchema]
});

// ✅ Use this line to avoid OverwriteModelError
module.exports = mongoose.models.vendors || mongoose.model('vendors', vendorSchema);
