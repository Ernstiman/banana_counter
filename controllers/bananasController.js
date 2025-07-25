const {error} = require("../utils")
const {get_count, set_banana_count} = require("../db")


exports.getBananaCount = async (req, res) => {

    const {users} = req.body

    try{
        let {count, total_count} = await get_count(users);
        return res.json({
            count: count ? count : 0, total_count : total_count ? total_count : 0
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