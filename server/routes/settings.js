const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");

router.get("/get", settingsController.get);
router.post("/post", settingsController.post);

module.exports = router;