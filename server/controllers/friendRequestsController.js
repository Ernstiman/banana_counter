const { error } = require("../utils");
const {
  insert_friend_requests,
  select_friend_requests,
  remove_friend_requests,
} = require("../db");
const router = require("../routes/auth");

exports.sendFriendRequest = async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    await insert_friend_requests(sender, receiver);
    res.json("Friend request sent!");
  } catch (err) {
    error(err, res);
  }
};

exports.getFriendRequests = async (req, res) => {
  const username = req.query.username;
  try {
    let friend_requests = await select_friend_requests(username);
    res.json({ friend_requests });
  } catch (err) {
    error(err, res);
  }
};

exports.removeFriendRequest = async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    await remove_friend_requests(sender, receiver);
    res.json("Friend request removed!");
  } catch (err) {
    error(err, res);
  }
};


