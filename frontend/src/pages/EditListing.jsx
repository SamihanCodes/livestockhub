import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMyListings, updateListing } from "../api/listings";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    animal_type: "",
    breed: "",
    age: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyListings().then((res) => {
      const listing = res.data.find(
        (l) => String(l.id) === String(id)
      );

      if (!listing) {
        alert("Listing not found");
        navigate("/listings/my");
        return;
      }

      setForm({
        animal_type: listing.animal_type ?? "",
        breed: listing.breed ?? "",
        age: listing.age ?? "",
        price: listing.price ?? "",
        description: listing.description ?? "",
      });

      setLoading(false);
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Explicit payload (NO status ever)
    const payload = {
      animal_type: form.animal_type,
      breed: form.breed,
      age: form.age ? Number(form.age) : null,
      price: Number(form.price),
      description: form.description,
    };

    try {
      await updateListing(id, payload);
      alert("Listing updated successfully");
      navigate("/listings/my");
    } catch (err) {
      console.error(err);
      alert("Failed to update listing");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p style={{ color: "#475569" }}>
            Loading listing details…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ color: "#142C52", marginBottom: "16px" }}>
          Edit Listing
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

          <button
            type="submit"
            style={{
              marginTop: "12px",
              backgroundColor: "#16808D",
            }}
          >
            Update Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
