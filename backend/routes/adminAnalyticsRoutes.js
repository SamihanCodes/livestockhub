const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const {
  getAdminAnalytics,
} = require("../controllers/adminAnalyticsController");

router.get(
  "/summary",
  authenticate,
  authorizeRole("admin"),
  getAdminAnalytics
);

module.exports = router;
