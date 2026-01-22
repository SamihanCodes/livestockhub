const pool = require("../config/db");

const getAdminAnalytics = async (req, res) => {
  try {
    const usersResult = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    const listingsResult = await pool.query(
      "SELECT COUNT(*) FROM listings"
    );

    const transactionsResult = await pool.query(
      "SELECT COUNT(*) FROM transactions"
    );

    const revenueResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE status = 'paid'"
    );

    res.json({
      totalUsers: Number(usersResult.rows[0].count),
      totalListings: Number(listingsResult.rows[0].count),
      totalTransactions: Number(transactionsResult.rows[0].count),
      totalRevenue: Number(revenueResult.rows[0].coalesce),
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAdminAnalytics,
};
