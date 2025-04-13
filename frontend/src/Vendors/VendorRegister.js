// src/Vendors/VendorRegister.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './vendorRegistration.css';
function VendorRegister() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/vendor/register', form);
      alert(res.data.message);
      navigate('/vendor-login'); // ← Redirect here
    } catch (err) {
      alert(err.response.data.message || 'Registration failed');
    }
    
  };

  return (
    <div className="vendor-register-container">
    <form onSubmit={handleSubmit} className="vendor-register-form">
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  </div>
  
  );
}

export default VendorRegister;
