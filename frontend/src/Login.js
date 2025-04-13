import { useState } from "react";
import './login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: form.email,
        password: form.password
      });

      const { token, role } = response.data;
      localStorage.setItem('token', token);

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/browse');
      }
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
