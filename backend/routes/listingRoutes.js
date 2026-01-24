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


router.get("/", getAllListings);


router.get("/search", searchListings);


router.post(
  "/",
  authenticate,
  authorizeRole("seller"),
  createListing
);


router.get(
  "/my",
  authenticate,
  authorizeRole("seller"),
  getMyListings
);


router.put(
  "/:id",
  authenticate,
  authorizeRole("seller"),
  updateListing
);


router.patch(
  "/:id/status",
  authenticate,
  authorizeRole("seller"),
  updateListingStatus
);

module.exports = router;
