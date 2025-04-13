
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
// import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
 function Home(){
    const navigate=useNavigate();
    return (<>
        <div className="hero">
        <h1>Welcome to EasyTravel</h1>
        <p>Your journey starts here. Rent cars and bikes at the best prices!</p>
        <button onClick={() => navigate("/register")}>Get Started</button>
      </div>
      <div className="features">
      <div className="feature">
        <h3>Affordable Rates</h3>
        <p>Best prices guaranteed with no hidden fees.</p>
      </div>
      <div className="feature">
        <h3>Easy Booking</h3>
        <p>Book your vehicle in just a few clicks.</p>
      </div>
      <div className="feature">
        <h3>24/7 Support</h3>
        <p>We're here to help anytime, anywhere.</p>
      </div>
    </div>
    </>
    
      
    )
 }
 export default Home;