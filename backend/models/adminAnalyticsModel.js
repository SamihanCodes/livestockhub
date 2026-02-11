const pool = require("../config/db");

const getAdminStats = async () => {
  const result = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM users WHERE role = 'seller') AS total_sellers,
      (SELECT COUNT(*) FROM users WHERE role = 'buyer') AS total_buyers,
      (SELECT COUNT(*) FROM listings) AS total_listings,
      (SELECT COUNT(*) FROM listings WHERE status = 'active') AS active_listings,
      (SELECT COUNT(*) FROM listings WHERE status = 'sold') AS sold_listings,
      (SELECT COUNT(*) FROM transactions) AS total_transactions,
      (SELECT COALESCE(SUM(amount), 0) FROM transactions) AS total_revenue
  `);

  return result.rows[0];
};

// Transactions per day
const getTransactionsOverTime = async () => {
  const result = await pool.query(`
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as count
    FROM transactions
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
  `);
  return result.rows;
};

// Revenue per day
const getRevenueOverTime = async () => {
  const result = await pool.query(`
    SELECT 
      DATE(created_at) as date,
      SUM(amount) as revenue
    FROM transactions
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
  `);
  return result.rows;
};

module.exports = {
  getAdminStats,
  getTransactionsOverTime,
  getRevenueOverTime,
};