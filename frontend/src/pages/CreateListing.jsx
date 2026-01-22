import { useState } from "react";
import { createListing } from "../api/listings";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [form, setForm] = useState({
    animal_type: "",
    breed: "",
    age: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createListing(form);
      alert("Listing created successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create listing");
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container" style={{ maxWidth: "500px" }}>
        <div className="card">
          <h2 style={{ marginBottom: "10px" }}>Create Livestock Listing</h2>

          <p style={{ color: "#475569", marginBottom: "20px" }}>
            Provide accurate details to attract genuine buyers.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Animal Type *</label>
            <input
              name="animal_type"
              placeholder="e.g. Cow, Goat, Buffalo"
              value={form.animal_type}
              onChange={handleChange}
              required
            />

            <label>Breed</label>
            <input
              name="breed"
              placeholder="e.g. Jersey, Sahiwal"
              value={form.breed}
              onChange={handleChange}
            />

            <label>Age (years)</label>
            <input
              name="age"
              type="number"
              placeholder="e.g. 3"
              value={form.age}
              onChange={handleChange}
            />

            <label>Price (₹) *</label>
            <input
              name="price"
              type="number"
              placeholder="Enter expected price"
              value={form.price}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              placeholder="Health condition, milk yield, vaccination status, etc."
              value={form.description}
              onChange={handleChange}
              rows="4"
            />

            <button
              type="submit"
              style={{ width: "100%", marginTop: "10px" }}
            >
              Create Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
