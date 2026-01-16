import { useEffect, useState } from "react";
import { getAllListings } from "../api/listings";
import { createInterest } from "../api/interests";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getAllListings().then((res) => setListings(res.data));
  }, []);

  const handleInterest = async (listingId) => {
    try {
      await createInterest(listingId);
      alert("Interest registered");
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to register interest"
      );
    }
  };

  return (
    <div className="container">
      <h2>Available Listings</h2>

      {listings.map((l) => (
        <div className="card" key={l.id}>
          <p>
            {l.animal_type} - ₹{l.price}
          </p>
          <p>{l.description}</p>

          
          <button onClick={() => handleInterest(l.id)}>
            I’m Interested
          </button>
        </div>
      ))}
    </div>
  );
};

export default Listings;
