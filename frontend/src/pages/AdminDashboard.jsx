import { useEffect, useState } from "react";
import {
  getAdminDashboardStats,
  getTransactionsChart,
  getRevenueChart,
  getLatestListings,
  getTopListings
} from "../api/adminAnalytics";

import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [transactionsData, setTransactionsData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [latestListings, setLatestListings] = useState([]);
  const [topListings, setTopListings] = useState([]);

  useEffect(() => {
    getAdminDashboardStats().then(res => setStats(res.data));
    getTransactionsChart().then(res => setTransactionsData(res.data));
    getRevenueChart().then(res => setRevenueData(res.data));
    getLatestListings().then(res => setLatestListings(res.data));
    getTopListings().then(res => setTopListings(res.data));
  }, []);

  if (!stats) return <div className="container">Loading analytics...</div>;

  const Card = ({ title, value }) => (
    <div className="card" style={{ textAlign: "center" }}>
      <h3>{title}</h3>
      <h2 style={{ color: "#4C97A8", fontSize: "28px" }}>{value}</h2>
    </div>
  );

  return (
    <div className="container">
      <h2 style={{ marginBottom: 20 }}>Admin Analytics Dashboard</h2>

      {/* KPI CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <Card title="Total Users" value={stats.total_users} />
        <Card title="Total Listings" value={stats.total_listings} />
        <Card title="Transactions" value={stats.total_transactions} />
        <Card title="Revenue" value={`₹ ${stats.total_revenue}`} />
      </div>

      {/* LINE CHARTS */}
      <div style={{ marginTop: 50 }}>
        <h3>Transactions Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactionsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#4C97A8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: 50 }}>
        <h3>Revenue Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#22C55E" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* LATEST LISTINGS */}
      <div className="card" style={{ marginTop: 50 }}>
        <h3>Latest Listings</h3>

        {latestListings.length === 0 && <p>No listings found.</p>}

        {latestListings.map(l => (
          <div
            key={l.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #e5e7eb"
            }}
          >
            <div>
              <strong>{l.animal_type}</strong>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Seller: {l.seller_email}
              </div>
            </div>
            <span>₹ {l.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
