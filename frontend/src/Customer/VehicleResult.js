import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import car1 from './imagesCust/car1.jpg';
import bike2 from './imagesCust/bike2.jpg'; 
import car2 from './imagesCust/car2.jpg'; 
import './vechicleresult.css';
import { useNavigate } from 'react-router-dom';
const allVehicles = {
  Car: [
    { name: 'Hyundai i20', location: 'Coimbatore', price: '₹1500/day', features: 'AC, Automatic, 5 Seater', fuel: 'With Fuel', img: car1 },
    { name: 'Hyundai i20', location: 'Chennai', price: '₹1500/day', features: 'AC, Automatic, 5 Seater', fuel: 'With Fuel', img: car2 },
    { name: 'Hyundai i20', location: 'Coimbatore', price: '₹1500/day', features: 'AC, Automatic, 5 Seater', fuel: 'Without Fuel', img: car2 },
    { name: 'Hyundai i20', location: 'Coimbatore', price: '₹1500/day', features: 'AC, Automatic, 5 Seater', fuel: 'With Fuel', img: car1 },
    { name: 'Hyundai i20', location: 'Coimbatore', price: '₹1500/day', features: 'AC, Automatic, 5 Seater', fuel: 'With Fuel', img: car1 },
    { name: 'Hyundai i20', location: 'Coimbatore', price: '₹1500/day', features: 'AC, Automatic, 5 Seater', fuel: 'With Fuel', img: car1 }

    

  ],
  Bike:[
    { name: 'Royal enfield i20', location: 'Chennai', price: '₹1500/day', features: 'AC, Automatic, 5 Seater', img: bike2 },
    { name: 'RX100', location: 'bangalore', price: '₹1500/day', features: 'AC, Automatic, 5 Seater', img: bike2 },
    { name: 'Rx100', location: 'Coimbatore', price: '₹1500/day', features: 'AC, Automatic, 5 Seater', img: bike2 },

  ]
};

function VehicleResult() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const formData = state?.formData || {};

  // const results = allVehicles[formData.vehicleType]?.filter(
  //   (v) => v.location === formData.location
  // );

  
const handleImageClick = (vehicle) => {
  navigate('/vehicledetails', { state: { vehicle } });
};
const [fuelType, setFuelType] = useState('All');

let filtered = allVehicles[formData.vehicleType]?.filter(
  (v) => v.location === formData.location
);

if (fuelType !== 'All') {
  filtered = filtered.filter((v) => v.fuel === fuelType);
}


 


  return <>
    <div className="filter-bar">
  <label>Fuel Option: </label>
  <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
    <option value="All">All</option>
    <option value="With Fuel">With Fuel</option>
    <option value="Without Fuel">Without Fuel</option>
  </select>
</div>

{filtered?.map((v, i) => (
  <div className="vehicle-card" key={i}>
    <img src={v.img} alt={v.name} onClick={() => handleImageClick(v)} />
    <h4>{v.name}</h4>
    <p>{v.price}</p>
    <p>{v.fuel}</p>
  </div>
))}

    

  </>
}

export default VehicleResult;
