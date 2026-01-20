const express = require("express");
const router = express.Router();
const { getSummary } = require("../controllers/adminController");

const {
  getAllUsers,
  getAllListings,
  getAllTransactions,
} = require("../controllers/adminController");

const authenticate = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/users", authenticate, adminOnly, getAllUsers);
router.get("/listings", authenticate, adminOnly, getAllListings);
router.get("/transactions", authenticate, adminOnly, getAllTransactions);
router.get("/summary", authenticate, adminOnly, getSummary);

module.exports = router;
