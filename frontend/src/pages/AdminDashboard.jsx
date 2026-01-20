import { useEffect, useState } from "react";
import { getUsers, getListings, getTransactions } from "../api/admin";
import { getAdminSummary } from "../api/adminSummary";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
    getListings().then((res) => setListings(res.data));
    getTransactions().then((res) => setTransactions(res.data));
    getAdminSummary().then((res) => setSummary(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      
      {summary && (
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div className="card">
            Users<br />
            <strong>{summary.totalUsers}</strong>
          </div>

          <div className="card">
            Listings<br />
            <strong>{summary.totalListings}</strong>
          </div>

          <div className="card">
            Transactions<br />
            <strong>{summary.totalTransactions}</strong>
          </div>

          <div className="card">
            Revenue<br />
            <strong>₹{summary.totalRevenue}</strong>
          </div>
        </div>
      )}

      <h3>Users</h3>
      {users.map((u) => (
        <p key={u.id}>
          {u.name} — {u.email} ({u.role})
        </p>
      ))}

      <h3>Listings</h3>
      {listings.map((l) => (
        <p key={l.id}>
          {l.animal_type} — ₹{l.price}
        </p>
      ))}

      <h3>Transactions</h3>
      {transactions.map((t) => (
        <p key={t.id}>
          ₹{t.amount} — {t.status}
        </p>
      ))}
    </div>
  );
};

export default AdminDashboard;
