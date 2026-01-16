import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";

const MyListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getMyListings().then((res) => setListings(res.data));
  }, []);

  return (
    <div className="container">
      <h2>My Listings</h2>

      {listings.map((l) => (
        <div className="card" key={l.id}>
          <p>
            {l.animal_type} - ₹{l.price}
          </p>
          <p>Status: {l.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyListings;
