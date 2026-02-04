const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {
  getAdminDashboardStats,
  getTransactionsChart,
  getRevenueChart,
  getLatestListings,
  getTopListings,
} = require("../controllers/adminAnalyticsController");


router.get("/stats", authenticate, authorizeRole("admin"), getAdminDashboardStats);
router.get("/transactions-chart", authenticate, authorizeRole("admin"), getTransactionsChart);
router.get("/revenue-chart", authenticate, authorizeRole("admin"), getRevenueChart);
router.get("/latest-listings", authenticate, authorizeRole("admin"), getLatestListings);
router.get("/top-listings", authenticate, authorizeRole("admin"), getTopListings);

module.exports = router;
