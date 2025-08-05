
const express = require("express");
const authController = require("../controllers/authController");
const router  = express.Router();

router.post("/login", authController.postLogin);

router.post("/create-account", authController.createAccount);

router.get("/me", authController.getAccountDetails)

router.post("/logout", authController.logOut);

router.put("/change-password", authController.changePassword);

router.post("/forgot-password-link", authController.forgotPasswordLink);

router.get("/get-reset-password", authController.getResetPassword);
module.exports = router;