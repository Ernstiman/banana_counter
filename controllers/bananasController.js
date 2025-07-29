const {error} = require("../utils")
const {getUserData, set_banana_count, getTotalCount} = require("../db");


exports.getBananaCount = async (req, res) => {

    const {users} = req.body

    try{
        let userData = await getUserData(users);
        let totalCount = await getTotalCount();
        return res.json({
            count: userData[0].count ? userData[0].count : 0,
            totalCount: totalCount ? totalCount : 0
        })
    }

    catch (err) {
        error(err, res);
    }
}



exports.postBananaCount = async (req, res) => {
    const {count} = req.body;
    const username = req.session.username

    try {
        await set_banana_count(username, count)
        res.json({message: "Banana count updated successfully"});
    }
    catch (err) {
        error(err, res);
    }

}