import { useEffect, useState } from 'react';
import './admin.css';
// import axios from 'axios';

function Admin() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/pending-vehicles")
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error("Error fetching:", err));
  }, []);
  
  const updateStatus = async (id, newStatus) => {
    try {
      const endpoint = `http://localhost:5000/api/admin/${newStatus}/${id}`;
      await fetch(endpoint, { method: "PATCH" });
      setRequests(prev =>
        prev.map(req => (req._id === id ? { ...req, status: newStatus } : req))
      );
    } catch (err) {
      console.error("Error updating vehicle status:", err);
    }
  };
  

  return (
    <div className="admin-page">
      {requests.map((vehicle) => (
  <div key={vehicle._id} className="vehicle-card">
    <img
      src={`http://localhost:5000/uploads/${vehicle.img}`}
      alt={vehicle.name}
      className="vehicle-image"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://via.placeholder.com/150'; // fallback image
      }}
    />
    <h3>{vehicle.name} ({vehicle.type})</h3>
    <p><strong>Location:</strong> {vehicle.location}</p>
    <p><strong>Price:</strong> {vehicle.price}</p>
    <p><strong>Status:</strong> {vehicle.status}</p>
    <div className="action-buttons">
      <button className="approve-btn" onClick={() => updateStatus(vehicle._id, 'approved')}>Approve</button>
      <button className="reject-btn" onClick={() => updateStatus(vehicle._id, 'rejected')}>Reject</button>
    </div>
  </div>
))}

    </div>
  );
}


export default Admin;
