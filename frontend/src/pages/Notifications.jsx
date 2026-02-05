import { useEffect, useState } from "react";
import {
  getMyNotifications,
  markNotificationRead,
} from "../api/notifications";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getMyNotifications().then(res => setNotifications(res.data));
  }, []);

  const markRead = async (id) => {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map(n =>
        n.id === id ? { ...n, is_read: true } : n
      )
    );
  };

  return (
    <div className="container">
      <h2>Notifications</h2>

      {notifications.length === 0 && (
        <p>No notifications</p>
      )}

      {notifications.map(n => (
        <div
          key={n.id}
          className="card"
          style={{
            backgroundColor: n.is_read ? "#f1f5f9" : "#e0f2fe",
          }}
        >
          <h4>{n.title}</h4>
          <p>{n.message}</p>

          {!n.is_read && (
            <button
              style={{ marginTop: 8 }}
              onClick={() => markRead(n.id)}
            >
              Mark as read
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
