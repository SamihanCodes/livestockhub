const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const {
  getMyNotifications,
  markNotificationRead,
} = require("../controllers/notificationController");

router.get("/", authenticate, getMyNotifications);
router.patch("/:id/read", authenticate, markNotificationRead);

module.exports = router;
