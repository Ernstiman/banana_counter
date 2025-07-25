
const { get_all_users } = require("../db");
const { error } = require("../utils");

exports.getUsers = async (req, res) => {
  try {
    let users = await get_all_users(req.session.username);
    res.json(users);
  } catch (err) {
    error(err, res);
  }
};