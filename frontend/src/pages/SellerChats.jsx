import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";
import { getBuyersForListing } from "../api/messages";
import SellerChatWindow from "../components/SellerChatWindow";

const SellerChats = () => {
  const [listings, setListings] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    getMyListings().then((res) => setListings(res.data));
  }, []);

  const loadBuyers = async (listing) => {
    setSelectedListing(listing);
    setActiveChat(null);
    const res = await getBuyersForListing(listing.id);
    setBuyers(res.data);
  };

  return (
    <div className="container" style={{ display: "flex", gap: "20px" }}>
      
      {/* LEFT — Listings */}
      <div className="card" style={{ width: "25%" }}>
        <h3>My Listings</h3>
        {listings.map((l) => (
          <div
            key={l.id}
            style={{ cursor: "pointer", marginBottom: "8px" }}
            onClick={() => loadBuyers(l)}
          >
            {l.animal_type}
          </div>
        ))}
      </div>

      {/* MIDDLE — Buyers */}
      <div className="card" style={{ width: "25%" }}>
        <h3>Buyers</h3>
        {!selectedListing && <p>Select a listing</p>}
        {buyers.map((b) => (
          <div
            key={b.id}
            style={{ cursor: "pointer", marginBottom: "8px" }}
            onClick={() =>
              setActiveChat({
                listingId: selectedListing.id,
                buyerId: b.id,
                buyerEmail: b.email,
              })
            }
          >
            {b.email}
          </div>
        ))}
      </div>

      {/* RIGHT — Chat */}
      <div style={{ flex: 1 }}>
        {activeChat ? (
          <SellerChatWindow chat={activeChat} />
        ) : (
          <div className="card">
            <p>Select a buyer to start chat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerChats;
