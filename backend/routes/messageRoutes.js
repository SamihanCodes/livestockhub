const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessagesByListing,
  getBuyersForListing,
} = require("../controllers/messageController");

// Send message
router.post("/", authenticate, sendMessage);

// ✅ Get messages for a listing (optionally filtered by buyerId)
router.get(
  "/listing/:listingId",
  authenticate,
  getMessagesByListing
);

// ✅ Seller: get buyers who chatted on a listing
router.get(
  "/listing/:listingId/buyers",
  authenticate,
  getBuyersForListing
);

module.exports = router;
