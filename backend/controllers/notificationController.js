const notificationModel = require("../models/notificationModel");

const getMyNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.getUserNotifications(
      req.user.id
    );
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to load notifications" });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    await notificationModel.markAsRead(
      req.params.id,
      req.user.id
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update notification" });
  }
};

module.exports = {
  getMyNotifications,
  markNotificationRead,
};