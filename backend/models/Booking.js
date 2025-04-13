const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: String,
  vehicleId: String,
  pickupDate: Date,
  dropDate: Date,
  pickupLocation: String,
  dropLocation: String,
  paymentMethod: String
});

module.exports = mongoose.model('Booking', bookingSchema);
