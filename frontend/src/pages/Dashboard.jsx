import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="container">
        <p>No user data available</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

      <div className="card" style={{ marginBottom: "20px" }}>
        <p>
          <strong>Email:</strong>{" "}
          <span style={{ color: "#1B9AAA" }}>{user.email}</span>
        </p>

        <p>
          <strong>Role:</strong>{" "}
          <span style={{ textTransform: "capitalize" }}>
            {user.role}
          </span>
        </p>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>

        {user.role === "seller" && (
          <p>• Create and manage livestock listings</p>
        )}

        {user.role === "buyer" && (
          <p>• Browse listings and place bids</p>
        )}

        {user.role === "admin" && (
          <p>• Monitor platform analytics and users</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          backgroundColor: "#EF4444",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
