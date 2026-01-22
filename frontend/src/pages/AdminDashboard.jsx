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
      <h2 style={{ marginBottom: "20px", color: "#142C52" }}>
        Admin Dashboard
      </h2>

      <p style={{ color: "#475569", marginBottom: "25px" }}>
        Platform overview and system-wide analytics.
      </p>

      {/* Summary Cards */}
      {summary && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div className="card">
            <h3 style={{ color: "#1B9AAA" }}>Total Users</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>
              {summary.totalUsers}
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "#1B9AAA" }}>Total Listings</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>
              {summary.totalListings}
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "#1B9AAA" }}>Transactions</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>
              {summary.totalTransactions}
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "#22C55E" }}>Total Revenue</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>
              ₹{summary.totalRevenue}
            </p>
          </div>
        </div>
      )}

      {/* Users */}
      <h3 style={{ marginBottom: "10px" }}>Users</h3>
      {users.length === 0 && (
        <p style={{ color: "#64748b" }}>No users found</p>
      )}
      {users.map((u) => (
        <div key={u.id} className="card">
          <p><strong>Name:</strong> {u.name}</p>
          <p><strong>Email:</strong> {u.email}</p>
          <p>
            <strong>Role:</strong>{" "}
            <span style={{ textTransform: "capitalize" }}>
              {u.role}
            </span>
          </p>
        </div>
      ))}

      {/* Listings */}
      <h3 style={{ margin: "30px 0 10px" }}>Listings</h3>
      {listings.length === 0 && (
        <p style={{ color: "#64748b" }}>No listings found</p>
      )}
      {listings.map((l) => (
        <div key={l.id} className="card">
          <p><strong>Animal:</strong> {l.animal_type}</p>
          <p><strong>Price:</strong> ₹{l.price}</p>
          <p>
            <strong>Status:</strong>{" "}
            {l.status === "active" ? (
              <span style={{ color: "#22C55E" }}>Active</span>
            ) : (
              <span style={{ color: "#EF4444" }}>Sold</span>
            )}
          </p>
        </div>
      ))}

      {/* Transactions */}
      <h3 style={{ margin: "30px 0 10px" }}>Transactions</h3>
      {transactions.length === 0 && (
        <p style={{ color: "#64748b" }}>
          No transactions found
        </p>
      )}
      {transactions.map((t) => (
        <div key={t.id} className="card">
          <p><strong>Amount:</strong> ₹{t.amount}</p>
          <p>
            <strong>Status:</strong>{" "}
            {t.status === "pending" ? (
              <span style={{ color: "#F59E0B" }}>Pending</span>
            ) : (
              <span style={{ color: "#22C55E" }}>Paid</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
