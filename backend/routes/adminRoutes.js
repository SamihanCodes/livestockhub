const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  getAllListings,
  getAllTransactions,
  getSummary,
  blockUser,
  unblockUser,
} = require("../controllers/adminController");

// 🔹 Admin Dashboard Summary
router.get("/summary", authenticate, adminOnly, getSummary);

// 🔹 User Moderation
router.get("/users", authenticate, adminOnly, getAllUsers);
router.put("/users/:userId/block", authenticate, adminOnly, blockUser);
router.put("/users/:userId/unblock", authenticate, adminOnly, unblockUser);

// 🔹 Listing Moderation
router.get("/listings", authenticate, adminOnly, getAllListings);

// 🔹 Transactions (Read-only)
router.get("/transactions", authenticate, adminOnly, getAllTransactions);

module.exports = router;
