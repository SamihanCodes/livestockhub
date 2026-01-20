const pool = require("../config/db");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, created_at FROM users"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllListings = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM listings");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transactions");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const getSummary = async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const listings = await pool.query("SELECT COUNT(*) FROM listings");
    const transactions = await pool.query("SELECT COUNT(*) FROM transactions");
    const revenue = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE status = 'paid'"
    );

    res.json({
      totalUsers: users.rows[0].count,
      totalListings: listings.rows[0].count,
      totalTransactions: transactions.rows[0].count,
      totalRevenue: revenue.rows[0].coalesce,
    });
  } catch (error) {
    console.error("Admin summary error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getAllUsers,
  getAllListings,
  getAllTransactions,
   getSummary,
};
