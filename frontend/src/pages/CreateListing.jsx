import { useState } from "react";
import { createListing } from "../api/listings";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    animal_type: "",
    breed: "",
    age: "",
    price: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // 🧾 Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🖼️ Handle image selection + preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );
    setPreview(previews);
  };

  // 🚀 Submit listing
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      images.forEach((img) => {
        formData.append("images", img);
      });

      await createListing(formData);

      alert("Listing created successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create listing");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ color: "#142C52", marginBottom: "16px" }}>
          Create Listing
        </h2>

        <form onSubmit={handleSubmit}>
          <label><strong>Animal Type</strong></label>
          <input
            name="animal_type"
            value={form.animal_type}
            onChange={handleChange}
            required
          />

          <label><strong>Breed</strong></label>
          <input
            name="breed"
            value={form.breed}
            onChange={handleChange}
          />

          <label><strong>Age</strong></label>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
          />

          <label><strong>Price (₹)</strong></label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />

          <label><strong>Description</strong></label>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />

          {/* 🖼️ Image Upload */}
          <label><strong>Upload Images (max 5)</strong></label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />

          {/* 🔍 Image Preview */}
          {preview.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, 100px)",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {preview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            style={{
              marginTop: "16px",
              backgroundColor: "#16808D",
            }}
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
