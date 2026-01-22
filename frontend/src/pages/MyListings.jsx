import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";

const MyListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getMyListings().then((res) => setListings(res.data));
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>My Listings</h2>

      {listings.length === 0 && (
        <p style={{ color: "#475569" }}>
          You have not created any listings yet.
        </p>
      )}

      {listings.map((l) => (
        <div className="card" key={l.id}>
          <h3 style={{ color: "#142C52", marginBottom: "6px" }}>
            {l.animal_type}
          </h3>

          <p style={{ marginBottom: "4px" }}>
            <strong>Price:</strong> ₹{l.price}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {l.status === "active" ? (
              <span style={{ color: "#22C55E" }}>Active</span>
            ) : (
              <span style={{ color: "#EF4444" }}>Sold</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyListings;
