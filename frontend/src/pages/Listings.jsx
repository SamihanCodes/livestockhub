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
      alert("Interest registered");
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to register interest"
      );
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
      <h2>Available Listings</h2>

      {listings.length === 0 && <p>No listings available</p>}

      {listings.map((l) => (
        <div className="card" key={l.id}>
          <p>
            <strong>{l.animal_type}</strong> – ₹{l.price}
          </p>
          <p>{l.description}</p>

          {/* Interest */}
          <button onClick={() => handleInterest(l.id)}>
            I’m Interested
          </button>

          {/* Bidding */}
          <div style={{ marginTop: "10px" }}>
            <input
              type="number"
              placeholder="Enter your bid"
              value={bidAmounts[l.id] || ""}
              onChange={(e) =>
                handleBidChange(l.id, e.target.value)
              }
            />
            <p>
              <strong>Highest Bid:</strong>{" "}
              {l.highest_bid > 0 ? `₹${l.highest_bid}` : "No bids yet"}
            </p>


            <button
              style={{ marginLeft: "8px" }}
              onClick={() => handlePlaceBid(l.id)}
            >
              Place Bid
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listings;
