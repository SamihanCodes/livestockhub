import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import heroImage from "../assets/hero.jpg";
import Footer from "../components/Footer";
import "./Register.css";

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", formData);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div
        className="register-page"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <form className="register-card" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>
          <p className="subtitle">
            Join LiveStockHub as a buyer or seller
          </p>

          {error && <div className="error-box">{error}</div>}

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Register As</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>

          <button type="submit" className="register-btn">
            Register
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Register;
