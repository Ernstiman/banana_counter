const { error } = require("../utils");

const {
  insert_banana_history,
  select_banana_history,
} = require("../db");

exports.postBananaHistory = async (req, res) => {
    const { amount, caption } = req.body;
    const username = req.session.username;
    
    try {
        await insert_banana_history(amount, username, caption);
        res.json("Done!");
    } catch (err) {
        error(err, res);
    }
    }

exports.getBananaHistory = async (req, res) => {
    const users = req.body.users;
    
    try {
        let banana_history = await select_banana_history(users, req.session.username);
        res.json({ banana_history });
    } catch (err) {
        error(err, res);
    }
}