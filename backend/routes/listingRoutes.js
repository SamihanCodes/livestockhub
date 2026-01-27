const express = require("express");
const router = express.Router();

const {
  createListing,
  getAllListings,
  getMyListings,
  updateListingStatus,
  updateListing,
  searchListings,
} = require("../controllers/listingController");

const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// ✅ CREATE LISTING (WITH IMAGES)
router.post(
  "/",
  authenticate,
  authorizeRole("seller"),
  upload.array("images", 5),
  createListing
);

// ✅ GET ALL LISTINGS
router.get("/", getAllListings);

// ✅ SEARCH
router.get("/search", searchListings);

// ✅ SELLER LISTINGS
router.get(
  "/my",
  authenticate,
  authorizeRole("seller"),
  getMyListings
);

// ✅ EDIT LISTING
router.put(
  "/:id",
  authenticate,
  authorizeRole("seller"),
  updateListing
);

// ✅ UPDATE STATUS
router.patch(
  "/:id/status",
  authenticate,
  authorizeRole("seller"),
  updateListingStatus
);

module.exports = router;
