import { useEffect, useState } from "react";
import { getMyInterests } from "../api/interests";

const MyInterests = () => {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    getMyInterests().then((res) => setInterests(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Interested Buyers</h2>

      {interests.length === 0 && <p>No interests yet</p>}

      {interests.map((i, index) => (
        <div className="card" key={index}>
          <p><strong>Buyer:</strong> {i.buyer_name} ({i.buyer_email})</p>
          <p><strong>Animal:</strong> {i.animal_type}</p>
          <p><strong>Price:</strong> ₹{i.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MyInterests;
