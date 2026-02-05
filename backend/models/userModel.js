const pool = require("../config/db");
const createUser = async (name, email, hashedPassword, role) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role
  `;
  const values = [name, email, hashedPassword, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};
const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
const findUserById = async (id) => {
  const query = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
const updateUserProfile = async (userId, name, email) => {
  const query = `
    UPDATE users
    SET name = $1, email = $2
    WHERE id = $3
    RETURNING id, name, email, role
  `;
  const values = [name, email, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};
const updateUserPassword = async (userId, hashedPassword) => {
  const query = `
    UPDATE users
    SET password = $1
    WHERE id = $2
  `;
  await pool.query(query, [hashedPassword, userId]);
  return true;
};
// ADMIN – get all users
const getAllUsers = async () => {
  const result = await pool.query(`
    SELECT id, name, email, role, is_blocked, created_at
    FROM users
    ORDER BY created_at DESC
  `);
  return result.rows;
};

// ADMIN – block user
const blockUser = async (userId) => {
  const result = await pool.query(
    `UPDATE users SET is_blocked = true WHERE id = $1 RETURNING id, email, is_blocked`,
    [userId]
  );
  return result.rows[0];
};

// ADMIN – unblock user
const unblockUser = async (userId) => {
  const result = await pool.query(
    `UPDATE users SET is_blocked = false WHERE id = $1 RETURNING id, email, is_blocked`,
    [userId]
  );
  return result.rows[0];
};
const setUserBlockStatus = async (userId, isBlocked) => {
  const query = `
    UPDATE users
    SET is_blocked = $1
    WHERE id = $2
    RETURNING id, name, email, role, is_blocked
  `;
  const result = await pool.query(query, [isBlocked, userId]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserProfile,     
  updateUserPassword, 
  getAllUsers,
  blockUser,
  unblockUser,    
  setUserBlockStatus,
};
