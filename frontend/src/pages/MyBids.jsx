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
      alert("Bid accepted");
      window.location.reload();
    } catch {
      alert("Failed to accept bid");
    }
  };

  return (
    <div className="container">
      <h2>Bids on My Listings</h2>

      {bids.length === 0 && <p>No bids yet</p>}

      {bids.map((b) => (
        <div key={b.id} className="card">
          <p><strong>Animal:</strong> {b.animal_type}</p>
          <p><strong>Listing Price:</strong> ₹{b.listing_price}</p>
          <p><strong>Bid Amount:</strong> ₹{b.amount}</p>
          <p><strong>Buyer Email:</strong> {b.buyer_email}</p>

          {b.status === "pending" && (
            <button onClick={() => handleAcceptBid(b.id)}>
              Accept Bid
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBids;
