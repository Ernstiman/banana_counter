
express = require("express");
router = express.Router();
const friendRequestsController = require("../controllers/friendRequestsController");

router.post("/send-requests", friendRequestsController.sendFriendRequest);
router.get("/get-requests", friendRequestsController.getFriendRequests);
router.delete("/remove-requests", friendRequestsController.removeFriendRequest);

module.exports = router;