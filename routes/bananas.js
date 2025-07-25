const express = require("express");
const router = express.Router()
const bananasController = require("../controllers/bananasController");

router.post("/post-bananas", bananasController.postBananaCount);
router.post("/get-bananas", bananasController.getBananaCount);

module.exports = router;

