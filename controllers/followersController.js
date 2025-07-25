const { error } = require("../utils");
const { add_follower, remove_follower, get_followers, get_following } = require("../db");


exports.followUser = async (req, res) => {
    const { follower } = req.body;
    const following = req.session.username;
    console.log(follower, following);
    try {
        await add_follower(follower, following);
        res.json({ message: "Followed successfully" });
    } catch (err) {
        error(err, res);
    }
}

exports.unfollowUser = async (req, res) => {
    const { unfollowing } = req.body;
    const follower = req.session.username;

    try {
        await remove_follower(follower, unfollowing);
        res.json({ message: "Unfollowed successfully" });
    } catch (err) {
        error(err, res);
    }
}

exports.getFollowers = async (req, res) => {
    const userId = req.params.userId;

    try {
        const followers = await get_followers(userId);
        res.json(followers);
    } catch (err) {
        error(err, res);
    }
}

exports.getFollowing = async (req, res) => {
    const userId = req.params.userId;

    try {
        const following = await get_following(userId);
        res.json(following);
    } catch (err) {
        error(err, res);
    }
}