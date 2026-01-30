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
  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection + preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // max 5
    setImages(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );
    setPreview(previews);
  };

  // Submit listing
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.animal_type || !form.price) {
      alert("Animal type and price are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // Append text fields
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append images
      images.forEach((img) => {
        formData.append("images", img);
      });

      // DEBUG (you can remove later)
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await createListing(formData);

      alert("Listing created successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Create listing error:", err);
      alert(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to create listing"
      );
    } finally {
      setLoading(false);
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
            min="0"
            value={form.age}
            onChange={handleChange}
          />

          <label><strong>Price (₹)</strong></label>
          <input
            name="price"
            type="number"
            min="1"
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

          {/* Image Upload */}
          <label><strong>Upload Images</strong></label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />

          {/* Preview */}
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
            disabled={loading}
            style={{
              marginTop: "16px",
              backgroundColor: "#16808D",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
