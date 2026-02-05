import { useEffect, useState } from "react";
import {
  getAdminDashboardStats,
  getTransactionsChart,
  getRevenueChart,
  getLatestListings,
} from "../api/adminAnalytics";

import api from "../api/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [transactionsData, setTransactionsData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [latestListings, setLatestListings] = useState([]);

  const [users, setUsers] = useState([]);
  const [allListings, setAllListings] = useState([]);

  const [activeTab, setActiveTab] = useState("analytics");

  useEffect(() => {
    getAdminDashboardStats().then((res) => setStats(res.data));
    getTransactionsChart().then((res) => setTransactionsData(res.data || []));
    getRevenueChart().then((res) => setRevenueData(res.data || []));
    getLatestListings().then((res) => setLatestListings(res.data || []));

    api.get("/admin/users").then((res) => setUsers(res.data));
    api.get("/admin/listings").then((res) => setAllListings(res.data));
  }, []);

  if (!stats) return <div className="container">Loading admin dashboard...</div>;

  const Card = ({ title, value }) => (
    <div className="card" style={{ textAlign: "center" }}>
      <h3>{title}</h3>
      <h2 style={{ color: "#4C97A8", fontSize: 28 }}>{value}</h2>
    </div>
  );

  const handleBlockToggle = async (user) => {
    if (user.is_blocked) {
      await api.put(`/admin/users/${user.id}/unblock`);
    } else {
      await api.put(`/admin/users/${user.id}/block`);
    }

    const refreshed = await api.get("/admin/users");
    setUsers(refreshed.data);
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: 20 }}>Admin Dashboard</h2>

      {/* TABS */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {["analytics", "users", "listings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? "#4C97A8" : "#e5e7eb",
              color: activeTab === tab ? "#fff" : "#111",
            }}
          >
            {tab === "analytics" && "📊 Analytics"}
            {tab === "users" && "👤 Users"}
            {tab === "listings" && "📦 Listings"}
          </button>
        ))}
      </div>

      {/* ANALYTICS TAB */}
      {activeTab === "analytics" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            <Card title="Total Users" value={stats.total_users} />
            <Card title="Total Listings" value={stats.total_listings} />
            <Card title="Transactions" value={stats.total_transactions} />
            <Card title="Revenue" value={`₹ ${stats.total_revenue}`} />
          </div>

          <div style={{ marginTop: 40 }}>
            <h3>Transactions Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line dataKey="count" stroke="#4C97A8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: 40 }}>
            <h3>Revenue Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line dataKey="revenue" stroke="#22C55E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* USER MODERATION TAB */}
      {activeTab === "users" && (
        <div className="card">
          <h3>User Moderation</h3>

          <table width="100%" style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td style={{ color: u.is_blocked ? "#EF4444" : "#22C55E" }}>
                    {u.is_blocked ? "Blocked" : "Active"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleBlockToggle(u)}
                      style={{
                        backgroundColor: u.is_blocked ? "#22C55E" : "#EF4444",
                      }}
                    >
                      {u.is_blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* LISTING MODERATION TAB */}
      {activeTab === "listings" && (
        <div className="card">
          <h3>All Listings</h3>

          {allListings.map((l) => (
            <div
              key={l.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #e5e7eb",
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
      )}
    </div>
  );
};

export default AdminDashboard;
