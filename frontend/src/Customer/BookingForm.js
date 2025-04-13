import React, { useState } from 'react';
import './bookingform.css';
import { useNavigate } from 'react-router-dom';
const BookingForm=()=>{
  const [formData, setFormData] = useState({
    vehicleType: '',
    location: '',
    date: '',
    time: '',
    address: ''
  });
  
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", formData);
    // Send to backend or store locally
    navigate('/results', { state: { formData } });
  };

  return (
    <div className="booking-form">
      <h2>Plan Your Ride</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Vehicle Type:
          <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
          </select>
        </label>

        <label>
          Location:
          <select name="location" value={formData.location} onChange={handleChange} required>
            <option value="">-- Choose City --</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </label>

        <label>
          Pickup Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>

        <label>
          Pickup Time:
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </label>

        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} rows="3" placeholder="Enter your address" required></textarea>
        </label>

        <button type="submit">Search Vehicles</button>
      </form>
    </div>
  );
}


export default BookingForm;
