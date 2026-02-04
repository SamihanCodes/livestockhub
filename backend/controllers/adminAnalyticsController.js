const pool = require("../config/db");

const getAdminDashboardStats = async (req, res) => {
  try {
    const users = await pool.query(`SELECT COUNT(*)::int AS total FROM users`);
    const sellers = await pool.query(`SELECT COUNT(*)::int AS total FROM users WHERE role='seller'`);
    const buyers = await pool.query(`SELECT COUNT(*)::int AS total FROM users WHERE role='buyer'`);
    const listings = await pool.query(`SELECT COUNT(*)::int AS total FROM listings`);
    const transactions = await pool.query(`SELECT COUNT(*)::int AS total FROM transactions`);
    const revenue = await pool.query(`SELECT COALESCE(SUM(amount),0)::int AS total FROM transactions`);

    res.json({
      total_users: users.rows[0].total,
      total_sellers: sellers.rows[0].total,
      total_buyers: buyers.rows[0].total,
      total_listings: listings.rows[0].total,
      total_transactions: transactions.rows[0].total,
      total_revenue: revenue.rows[0].total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Admin stats error" });
  }
};


const getTransactionsChart = async (req, res) => {
  const result = await pool.query(`
    SELECT DATE(created_at) as date, COUNT(*) as count
    FROM transactions
    GROUP BY DATE(created_at)
    ORDER BY date
  `);
  res.json(result.rows);
};
const getRevenueChart = async (req, res) => {
  const result = await pool.query(`
    SELECT DATE(created_at) as date, SUM(amount) as revenue
    FROM transactions
    GROUP BY DATE(created_at)
    ORDER BY date
  `);
  res.json(result.rows);
};

const getLatestListings = async (req, res) => {
  const result = await pool.query(`
    SELECT id, animal_type, price, status, created_at
    FROM listings
    ORDER BY created_at DESC
    LIMIT 5
  `);
  res.json(result.rows);
};

const getTopListings = async (req, res) => {
  const result = await pool.query(`
    SELECT l.id, l.animal_type, COUNT(b.id) as bids
    FROM listings l
    LEFT JOIN bids b ON l.id = b.listing_id
    GROUP BY l.id
    ORDER BY bids DESC
    LIMIT 5
  `);
  res.json(result.rows);
};

module.exports = {
  getAdminDashboardStats,
  getTransactionsChart,
  getRevenueChart,
  getLatestListings,
  getTopListings,
};
