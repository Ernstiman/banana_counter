
const express = require("express");
const router = express.Router();
const pushNotificationsController = require("../controllers/pushNotificationsController");

router.post("/subscribe", pushNotificationsController.subscribe);
router.post("/send", pushNotificationsController.sendBananaNotification);
router.get("/get-public-vapid-key", pushNotificationsController.getPublicVapidKey);
router.post("/send-friend-request", pushNotificationsController.sendFriendRequestNotification)

module.exports = router;
