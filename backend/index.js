require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const customerRoutes = require("./routes/customerRoutes");
const vendorRoutes = require("./routes/vendorRoutes"); // ✅ Add this
const adminRoutes = require("./routes/adminRoutes");



const vehicleRoutes = require('./routes/vehicleRoutes');


const app = express();
app.use(cors());
app.use(express.json());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const bookingRoutes = require('./routes/bookingRoutes');
// app.use('/api', require('./routes/admin')); // or the file where this route exists

app.use("/api", customerRoutes);
app.use("/api/vendor", vendorRoutes); // ✅ Add this route
app.use("/api/admin", adminRoutes);
app.use('/api/vehicles', vehicleRoutes);

app.use('/api/bookings', bookingRoutes);


connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
