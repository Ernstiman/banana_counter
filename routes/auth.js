
const express = require("express");
const authController = require("../controllers/authController");
const router  = express.Router();

router.post("/login", authController.postLogin);

router.post("/create-account", authController.createAccount);

router.get("/me", authController.getAccountDetails)

router.post("/logout", authController.logOut);
module.exports = router;