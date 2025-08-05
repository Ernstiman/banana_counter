const { pool, insert_login, set_banana_count, check_login, get_all_users } = require("../db");
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/get-users", usersController.getUsers);

module.exports = router;
