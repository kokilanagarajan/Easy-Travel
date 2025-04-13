import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './vendor.css';
import car1 from './imagesvendor/homebg.jpg';

function VendorPage() {
  const { email } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    type: '',
    name: '',
    location: '',
    price: '',
    features: '',
    img: car1,
  });
const navigate=useNavigate();

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/api/vendor/vehicles/${email}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setVehicles(data);
          } else {
            console.warn("No vehicles found for vendor");
            setVehicles([]);
          }
        })
        .catch(err => console.error("Error fetching vendor data:", err));
    }
  }, [email]);
  
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewVehicle({ ...newVehicle, img: file });
    }
  };
  
  const handleAddVehicle = () => {
    const formData = new FormData();
    formData.append('type', newVehicle.type);
    formData.append('name', newVehicle.name);
    formData.append('location', newVehicle.location);
    formData.append('price', newVehicle.price);
    formData.append('features', newVehicle.features);
    formData.append('img', newVehicle.img); // the actual file


    fetch(`http://localhost:5000/api/vendor/vehicles/${email}`, {
      method: "POST",
      body: formData,
    })
      .then(res => {
        console.log("Raw response:", res);
        return res.json(); // this line fails if response is HTML
      })
      .then(data => {
        setVehicles(data.vehicles);
        setNewVehicle({
          type: '',
          name: '',
          location: '',
          price: '',
          features: '',
          img: null,
        });
        setShowForm(false);
      })
      .catch(err => console.error("Error adding vehicle:", err));
    }    
  

    const handleRemove = (id) => {
      if (window.confirm("Are you sure you want to remove this vehicle?")) {
        fetch(`http://localhost:5000/api/vendor/${email}/vehicles/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data.vehicles)) {
              setVehicles(data.vehicles);
            }
          })
          .catch((err) => console.error("Error removing vehicle:", err));
      }
    };
    
  

  return (
    <div className="vendor-page">
      <h2>Vendor Dashboard - {email}</h2>
  
      <button onClick={() => setShowForm(!showForm)} className="add-btn">
        {showForm ? 'Cancel' : 'Add Vehicle'}
      </button>
  
      {showForm && (
        <div className="add-form">
          <input placeholder="Type (Car/Bike)" value={newVehicle.type} onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })} />
          <input placeholder="Name" value={newVehicle.name} onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })} />
          <input placeholder="Location" value={newVehicle.location} onChange={(e) => setNewVehicle({ ...newVehicle, location: e.target.value })} />
          <input placeholder="Price" value={newVehicle.price} onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value })} />
          <input placeholder="Features" value={newVehicle.features} onChange={(e) => setNewVehicle({ ...newVehicle, features: e.target.value })} />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleAddVehicle} className="submit-btn">Add</button>
        </div>
      )}
  
      <div className="vehicle-list">
        {Array.isArray(vehicles) && vehicles.map((v) => (
          <div key={v._id || v.id} className="vehicle-card">
            {v.img && <img src={`http://localhost:5000/uploads/${v.img}`} alt={v.name} className="vehicle-image" />}
  
            <h4>{v.name} ({v.type})</h4>
            <p>📍 {v.location}</p>
            <p>💰 {v.price}</p>
            <p>🔧 {v.features}</p>
  
            {/* Status Tag */}
            {v.status === 'rejected' && <span className="rejected-tag">❌ Rejected</span>}
            {v.status === 'pending' && <span className="pending-tag">⏳ Pending</span>}
            {v.status === 'approved' && <span className="approved-tag">✅ Approved</span>}
            <button onClick={() => handleRemove(v._id)} className="remove-btn">Remove</button>

            <button onClick={() => navigate(`/vendor/bookings/${v._id}`)}>View Bookings</button>


          </div>
        ))}
      </div>
    </div>
  );
  
}

export default VendorPage;
