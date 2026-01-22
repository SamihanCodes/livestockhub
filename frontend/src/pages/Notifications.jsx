import { useEffect, useState } from "react";
import { getMyNotifications } from "../api/notifications";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getMyNotifications().then((res) => setNotifications(res.data));
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>
        Notifications
      </h2>

      <p style={{ color: "#475569", marginBottom: "20px" }}>
        Important updates related to bids, payments, and listings.
      </p>

      {notifications.length === 0 && (
        <p style={{ color: "#64748b" }}>
          You have no notifications.
        </p>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          className="card"
          style={{
            borderLeft: n.is_read
              ? "4px solid #CBD5E1"
              : "4px solid #EF4444",
          }}
        >
          <p style={{ marginBottom: "6px" }}>
            {n.message}
          </p>

          <small style={{ color: "#64748b" }}>
            {new Date(n.created_at).toLocaleString()}
          </small>

          {!n.is_read && (
            <span
              style={{
                display: "inline-block",
                marginLeft: "10px",
                fontSize: "12px",
                color: "#EF4444",
                fontWeight: "bold",
              }}
            >
              ● New
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
