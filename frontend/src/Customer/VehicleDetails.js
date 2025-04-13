import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './vehicledetails.css';

function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [form, setForm] = useState({
    pickupDate: '',
    pickupTime: '',
    dropDate: '',
    dropTime: '',
    pickupLocation: '',
    dropLocation: '',
    paymentMethod: 'UPI',
  });
  const [paymentMethod, setPaymentMethod] = useState('');


  useEffect(() => {
    fetch(`http://localhost:5000/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => setVehicle(data))
      .catch(err => console.error("Error fetching vehicle details:", err));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const customerId = localStorage.getItem('customerId'); // assuming customer is logged in
  
    const booking = {
      ...form,
      vehicleId: id,
      customerId,
      paymentMethod,
    };
  
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      const data = await res.json();
      if (res.ok) {
        if (paymentMethod === 'upi'||paymentMethod==='card') {
          // ✅ Redirect to fake UPI page
          window.location.href = '/fake-upi';
        } else {
          alert("Booking successful!");
        }
      } else {
        alert("Booking failed: " + data.message);
      }
    } catch (err) {
      console.error("Error during booking:", err);
    }
  };
  

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <img src={`http://localhost:5000/uploads/${vehicle.img}`} alt={vehicle.name} />
      <h2>{vehicle.name}</h2>
      <p>📍 Location: {vehicle.location}</p>
      <p>🚗 Type: {vehicle.type}</p>
      <p>💰 Price: {vehicle.price}</p>

      <form className="booking-form" onSubmit={handleBooking}>
  <label>
    Pickup Date:
    <br />
    <input
      type="date"
      required
      onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
    />
  </label>

  <label>
    Pickup Time:
    <br />
    <input
      type="time"
      required
      onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
    />
  </label>

  <label>
    Drop Date:
    <br />
    <input
      type="date"
      required
      onChange={(e) => setForm({ ...form, dropDate: e.target.value })}
    />
  </label>

  <label>
    Drop Time:
    <br />
    <input
      type="time"
      required
      onChange={(e) => setForm({ ...form, dropTime: e.target.value })}
    />
  </label>

  <input
    type="text"
    placeholder="Pickup Location"
    required
    onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
  />
  <input
    type="text"
    placeholder="Drop Location"
    required
    onChange={(e) => setForm({ ...form, dropLocation: e.target.value })}
  />

  <select
    value={paymentMethod}
    onChange={(e) => setPaymentMethod(e.target.value)}
  >
    <option value="">Select Payment Method</option>
    <option value="upi">UPI</option>
    <option value="card">Card</option>
    <option value="cash">Cash on Pickup</option>
  </select>

  <button type="submit">Book Now</button>
</form>

    </div>
  );
}

export default VehicleDetails;
