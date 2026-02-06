const pool = require("../config/db");

const createNotification = async (user_id, message) => {
  const result = await pool.query(
    `
    INSERT INTO notifications (user_id, message)
    VALUES ($1, $2)
    RETURNING *
    `,
    [user_id, message]
  );

  return result.rows[0];
};
const getUserNotifications = async (user_id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM notifications
    WHERE user_id = $1
    ORDER BY created_at DESC;
    `,
    [user_id]
  );
  return result.rows;
};

const markAsRead = async (id, user_id) => {
  await pool.query(
    `
    UPDATE notifications
    SET is_read = true
    WHERE id = $1 AND user_id = $2
    `,
    [id, user_id]
  );
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
};
