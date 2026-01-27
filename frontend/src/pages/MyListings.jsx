import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyListings().then((res) => setListings(res.data));
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px", color: "#142C52" }}>
        My Listings
      </h2>

      {listings.length === 0 && (
        <p style={{ color: "#475569" }}>
          You have not created any listings yet.
        </p>
      )}

      {listings.map((l) => (
        <div className="card" key={l.id}>
          {/* 🖼️ IMAGES */}
          {l.images && l.images.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              {l.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="livestock"
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
              ))}
            </div>
          ) : (
            <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
              No images uploaded
            </p>
          )}

          {/* 📄 DETAILS */}
          <h3 style={{ color: "#142C52", marginBottom: "6px" }}>
            {l.animal_type}
          </h3>

          <p style={{ marginBottom: "4px" }}>
            <strong>Price:</strong> ₹{l.price}
          </p>

          <p style={{ marginBottom: "10px" }}>
            <strong>Status:</strong>{" "}
            {l.status === "active" ? (
              <span style={{ color: "#22C55E" }}>Active</span>
            ) : (
              <span style={{ color: "#EF4444" }}>Sold</span>
            )}
          </p>

          {/* ✏️ EDIT */}
          {l.status === "active" && (
            <button
              onClick={() => navigate(`/listings/edit/${l.id}`)}
              style={{
                backgroundColor: "#16808D",
                padding: "6px 12px",
              }}
            >
              Edit Listing
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyListings;
