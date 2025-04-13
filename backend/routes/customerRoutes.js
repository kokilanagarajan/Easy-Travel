const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Using Mongoose now

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Please login.' });
    }

    const newCustomer = new Customer({ name, email, password, phone });
    await newCustomer.save();

    res.status(201).json({ message: 'Registration successful. Please login.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.includes('admineasytravel') && password.includes('easy')) {
      return res.status(200).json({ message: 'Admin login successful', role: 'admin', token: 'admin-token' });
    }

    const user = await Customer.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Customer login successful', role: 'customer', token: 'customer-token' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
