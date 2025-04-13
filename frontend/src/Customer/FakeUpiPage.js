import React from 'react';
import './FakeUpiPage.css'; // Make sure to create this CSS file
import { useNavigate } from 'react-router-dom';

const FakeUpiPage = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment simulated successfully!");
    navigate('/'); // redirect after simulation
  };

  return (
    <div className="upi-container">
      <div className="upi-card">
        <h2>Google Pay</h2>
        <p><strong>To:</strong> easytravel@upi</p>
        <p><strong>Amount:</strong> ₹1200</p>
        <p><strong>Note:</strong> EasyTravel booking</p>
        <button className="pay-button" onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default FakeUpiPage;
