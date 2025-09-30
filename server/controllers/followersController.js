const { error } = require("../utils");
const { add_follower, remove_follower, get_followers, get_following } = require("../db");
const { getUserData } = require("../db");



exports.followUser = async (req, res) => {
    const { follower } = req.body;
    const following = req.session.username;
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
        const {followers} = await get_followers(userId);
        const userData = await getUserData(followers, req.session.username);

        res.json({ userData });
    } catch (err) {
        console.log(err);
    }
}

exports.getFollowing = async (req, res) => {
    const userId = req.params.userId;

    try {
        const {following} = await get_following(userId);
        const userData = await getUserData(following, req.session.username);
        res.json({ userData });
    } catch (err) {
        error(err, res);
    }
}