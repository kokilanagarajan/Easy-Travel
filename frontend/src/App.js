import Navbar from './Navbar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
// import BookingForm from './Customer/BookingForm';
import VehicleResult from './Customer/VehicleResult';
import VehicleDetails from './Customer/VehicleDetails';
import VendorRegister from './Vendors/VendorRegister';
import Admin from './Admins/Admin';
import VendorPage from './Vendors/VendorPage';
import './App.css';
import VendorLogin from './Vendors/VendorLogin';
import BrowseVehicles from './Customer/BrowserVechicles';
import FakeUpiPage from './Customer/FakeUpiPage';
import VendorBookings from './Vendors/VendorBookings';


function App() {
  return (
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/bookingform" element={<BookingForm />} />    */}
      <Route path="/results" element={<VehicleResult/>} /> 
      <Route path="/vehicle-details/:id" element={<VehicleDetails />} />

      <Route path="/admin" element={<Admin />} /> 
      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route path="/vendor-register" element={<VendorRegister />} /> 
      <Route path="/vendor/:email" element={<VendorPage />} />
      <Route path="/browse" element={<BrowseVehicles />} />
<Route path="/fake-upi" element={<FakeUpiPage />} />


<Route path="/vendor/bookings/:vehicleId" element={<VendorBookings />} />


    </Routes>
  </Router>
  );
}

export default App;
