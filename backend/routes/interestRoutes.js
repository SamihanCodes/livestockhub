const express = require("express");
const router = express.Router();

const {
  createInterest,
  getMyListingInterests,
} = require("../controllers/interestController");

const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// Buyer-only route — show interest
router.post(
  "/",
  authenticate,
  authorizeRole("buyer"),
  createInterest
);

// Seller-only route — view interests on own listings
router.get(
  "/my",
  authenticate,
  authorizeRole("seller"),
  getMyListingInterests
);

module.exports = router;
