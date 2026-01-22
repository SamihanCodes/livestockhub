import { useEffect, useState } from "react";
import { getMyInterests } from "../api/interests";

const MyInterests = () => {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    getMyInterests().then((res) => setInterests(res.data));
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>
        Interested Buyers
      </h2>

      <p style={{ color: "#475569", marginBottom: "20px" }}>
        Buyers who have shown interest in your livestock listings.
      </p>

      {interests.length === 0 && (
        <p style={{ color: "#64748b" }}>
          No buyers have shown interest yet.
        </p>
      )}

      {interests.map((i, index) => (
        <div className="card" key={index}>
          <p style={{ marginBottom: "6px" }}>
            <strong>Buyer Email:</strong>{" "}
            <span style={{ color: "#1B9AAA" }}>
              {i.buyer_email}
            </span>
          </p>

          <p style={{ marginBottom: "6px" }}>
            <strong>Animal:</strong> {i.animal_type}
          </p>

          <p>
            <strong>Listed Price:</strong> ₹{i.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyInterests;
