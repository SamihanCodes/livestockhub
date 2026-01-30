import { useEffect, useState } from "react";
import { getUsers, getListings, getTransactions } from "../api/admin";
import { getAdminAnalytics } from "../api/adminAnalytics";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
    getListings().then((res) => setListings(res.data));
    getTransactions().then((res) => setTransactions(res.data));
    getAdminAnalytics().then((res) => setSummary(res.data));
  }, []);

  return (
    <div className="container">
      <h2 style={{ color: "#142C52", marginBottom: "20px" }}>
        Admin Dashboard
      </h2>

      {/* 📊 SUMMARY */}
      {summary && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          {[
            { label: "Total Users", value: summary.totalUsers },
            { label: "Total Listings", value: summary.totalListings },
            { label: "Total Transactions", value: summary.totalTransactions },
            { label: "Total Revenue", value: `₹${summary.totalRevenue}` },
          ].map((item, i) => (
            <div className="card" key={i}>
              <h3>{item.label}</h3>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 👤 USERS */}
      <h3 style={{ marginBottom: "10px" }}>Users</h3>
      {users.map((u) => (
        <div key={u.id} className="card">
          <p><strong>Name:</strong> {u.name}</p>
          <p><strong>Email:</strong> {u.email}</p>
          <p><strong>Role:</strong> {u.role}</p>
        </div>
      ))}

      {/* 📦 LISTINGS WITH IMAGES */}
      <h3 style={{ margin: "30px 0 10px" }}>Listings</h3>

      {listings.map((l) => (
        <div key={l.id} className="card">
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
                  alt="listing"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                    border: "1px solid #e5e7eb",
                  }}
                />
              ))}
            </div>
          ) : (
            <p style={{ color: "#94a3b8" }}>No images uploaded</p>
          )}

          <p><strong>Animal:</strong> {l.animal_type}</p>
          <p><strong>Price:</strong> ₹{l.price}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: l.status === "active" ? "#22C55E" : "#EF4444",
              }}
            >
              {l.status}
            </span>
          </p>
        </div>
      ))}

      {/* 💳 TRANSACTIONS */}
      <h3 style={{ margin: "30px 0 10px" }}>Transactions</h3>
      {transactions.map((t) => (
        <div key={t.id} className="card">
          <p><strong>Amount:</strong> ₹{t.amount}</p>
          <p><strong>Status:</strong> {t.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
