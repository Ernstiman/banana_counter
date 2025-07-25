
const express = require("express")
const router = express.Router();
const followersController = require("../controllers/followersController");

router.post("/follow", followersController.followUser);
router.delete("/unfollow", followersController.unfollowUser);
router.get("/:userId/followers", followersController.getFollowers);
router.get("/:userId/following", followersController.getFollowing);

module.exports = router;