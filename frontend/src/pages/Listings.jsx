import { useEffect, useState } from "react";
import { getAllListings } from "../api/listings";
import { createInterest } from "../api/interests";
import { placeBid } from "../api/bids";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});

  useEffect(() => {
    getAllListings().then((res) => setListings(res.data));
  }, []);

  const handleInterest = async (listingId) => {
    try {
      await createInterest(listingId);
      alert("Interest registered successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to register interest");
    }
  };

  const handleBidChange = (listingId, value) => {
    setBidAmounts((prev) => ({
      ...prev,
      [listingId]: value,
    }));
  };

  const handlePlaceBid = async (listingId) => {
    try {
      if (!bidAmounts[listingId]) {
        alert("Please enter a bid amount");
        return;
      }

      if (Number(bidAmounts[listingId]) <= 0) {
        alert("Bid amount must be greater than zero");
        return;
      }

      await placeBid(listingId, bidAmounts[listingId]);
      alert("Bid placed successfully");

      setBidAmounts((prev) => ({
        ...prev,
        [listingId]: "",
      }));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place bid");
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>Available Listings</h2>

      {listings.length === 0 && (
        <p style={{ color: "#475569" }}>No listings available</p>
      )}

      {listings.map((l) => (
        <div className="card" key={l.id}>
          <h3 style={{ color: "#142C52", marginBottom: "5px" }}>
            {l.animal_type}
          </h3>

          <p style={{ marginBottom: "5px" }}>
            <strong>Price:</strong> ₹{l.price}
          </p>

          <p style={{ color: "#475569" }}>{l.description}</p>

          {/* Highest bid */}
          <p style={{ marginTop: "8px" }}>
            <strong>Highest Bid:</strong>{" "}
            {l.highest_bid > 0 ? (
              <span style={{ color: "#22C55E" }}>
                ₹{l.highest_bid}
              </span>
            ) : (
              <span>No bids yet</span>
            )}
          </p>

          {/* Actions */}
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button onClick={() => handleInterest(l.id)}>
              I’m Interested
            </button>

            <input
              type="number"
              placeholder="Your bid"
              value={bidAmounts[l.id] || ""}
              onChange={(e) =>
                handleBidChange(l.id, e.target.value)
              }
              style={{ maxWidth: "140px" }}
            />

            <button onClick={() => handlePlaceBid(l.id)}>
              Place Bid
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listings;
