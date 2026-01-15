import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";
import { getListingInterests } from "../api/interests";

const MyListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getMyListings().then((res) => setListings(res.data));
  }, []);


  const viewInterests = async (listingId) => {
    try {
      const res = await getListingInterests(listingId);

      if (res.data.length === 0) {
        alert("No interests yet");
        return;
      }

      const buyers = res.data
        .map((i) => i.buyer_email)
        .join(", ");

      alert(`Interested buyers: ${buyers}`);
    } catch (error) {
      alert("Failed to load interests");
    }
  };

  return (
    <div>
      <h2>My Listings</h2>

      {listings.map((l) => (
        <div key={l.id}>
          <p>
            {l.animal_type} - ₹{l.price}
          </p>
          <p>Status: {l.status}</p>

        
          <button onClick={() => viewInterests(l.id)}>
            View Interests
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyListings;
