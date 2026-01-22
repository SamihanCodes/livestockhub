import { useEffect, useState } from "react";
import { getMyBids } from "../api/bids";
import api from "../api/axios";

const MyBids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    getMyBids().then((res) => setBids(res.data));
  }, []);

  const handleAcceptBid = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/accept`);
      alert("Bid accepted successfully");
      window.location.reload();
    } catch {
      alert("Failed to accept bid");
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>
        Bids on My Listings
      </h2>

      <p style={{ color: "#475569", marginBottom: "20px" }}>
        Review bids placed by buyers and accept the best offer.
      </p>

      {bids.length === 0 && (
        <p style={{ color: "#64748b" }}>
          No bids have been placed yet.
        </p>
      )}

      {bids.map((b) => (
        <div className="card" key={b.id}>
          <h3 style={{ color: "#142C52", marginBottom: "8px" }}>
            {b.animal_type}
          </h3>

          <p>
            <strong>Listing Price:</strong> ₹{b.listing_price}
          </p>

          <p>
            <strong>Bid Amount:</strong>{" "}
            <span style={{ color: "#22C55E" }}>
              ₹{b.amount}
            </span>
          </p>

          <p>
            <strong>Buyer Email:</strong>{" "}
            <span style={{ color: "#1B9AAA" }}>
              {b.buyer_email}
            </span>
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {b.status === "pending" ? (
              <span style={{ color: "#F59E0B" }}>Pending</span>
            ) : (
              <span style={{ color: "#22C55E" }}>Accepted</span>
            )}
          </p>

          {b.status === "pending" && (
            <button
              style={{ marginTop: "10px" }}
              onClick={() => handleAcceptBid(b.id)}
            >
              Accept Bid
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBids;
