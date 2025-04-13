import { useState, useEffect } from 'react';
import './browse.css';

function BrowseVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({ type: '', location: '', price: '' });

  // Fetch approved vehicles once when the component loads.
  useEffect(() => {
    fetch("http://localhost:5000/api/vehicles/approved")
      .then(res => res.json())
      .then(data => setVehicles(data))
      .catch(err => console.error("Error fetching approved vehicles:", err));
  }, []);

  // Filter vehicles based on user input:
  // - If "type" is selected, only show vehicles that exactly match that type.
  // - If a "location" string is provided, check that the vehicle location includes that string (case-sensitive or lower-cased if needed).
  // - If a max "price" is provided (and assuming price is stored as a number or formatted price string), filter accordingly.
  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      (filters.type ? vehicle.type === filters.type : true) &&
      (filters.location ? vehicle.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      (filters.price ? parseInt(vehicle.price) <= parseInt(filters.price) : true)
    );
  });

  return (
    <div className="browse-container">
      <h2>Explore Vehicles</h2>

      {/* Filter inputs */}
      <div className="filters">
        <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All Types</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        />
      </div>

      {/* Display vehicles list */}
      <div className="vehicle-list">
        {filteredVehicles.length === 0 ? (
          <p>No vehicles match your criteria.</p>
        ) : (
          filteredVehicles.map(v => (
            <div key={v._id} className="vehicle-card">
              <img src={`http://localhost:5000/uploads/${v.img}`} alt={v.name} />
              <h4>{v.name}</h4>
              <p>📍 {v.location}</p>
              <p>💰 {v.price}</p>
              <button onClick={() => window.location.href = `/vehicle-details/${v._id}`}>
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseVehicles;
