

const express = require("express");
const router = express.Router();
const bananaHistoryController = require("../controllers/bananaHistoryController");

router.post("/post-history", bananaHistoryController.postBananaHistory);
router.post("/get-history", bananaHistoryController.getBananaHistory);

module.exports = router;