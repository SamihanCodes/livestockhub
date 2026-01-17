const express = require("express");
const router = express.Router();

const {
  placeBid,
  getMyBids,
  acceptBid
} = require("../controllers/bidController");

const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

router.post(
  "/",
  authenticate,
  authorizeRole("buyer"),
  placeBid
);

router.get(
  "/my",
  authenticate,
  authorizeRole("seller"),
  getMyBids
);

router.patch(
  "/:bid_id/accept",
  authenticate,
  authorizeRole("seller"),
  acceptBid
);

module.exports = router;
