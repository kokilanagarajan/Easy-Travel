import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VendorBookings = () => {
  const { vehicleId } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/bookings/vehicle/${vehicleId}`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error(err));
  }, [vehicleId]);

  return (
    <div className="vendor-bookings">
      <h2>Bookings for this Vehicle</h2>
      {bookings.length > 0 ? (
        bookings.map((b, i) => (
          <div key={i} className="booking-card">
            <p><strong>Pickup:</strong> {b.pickupLocation} ({b.pickupDate} {b.pickupTime})</p>
            <p><strong>Drop:</strong> {b.dropLocation} ({b.dropDate} {b.dropTime})</p>
            <p><strong>Payment:</strong> {b.paymentMethod}</p>
          </div>
        ))
      ) : (
        <p>No bookings found for this vehicle.</p>
      )}
    </div>
  );
};

export default VendorBookings;
