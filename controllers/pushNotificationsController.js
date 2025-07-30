const webPush = require("web-push");
const { insertNotificationSubscription, selectSubscriptions } = require("../db");
const {error} = require("../utils.js")

webPush.setVapidDetails(
    "mailto:viktor@ekastigen.net",
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

exports.subscribe = async (req, res) => {
    const {user_id, endpoint, keys} = req.body;
    const {p256dh, auth} = keys
    try{
        await insertNotificationSubscription(user_id, endpoint, p256dh, auth)
        res.json({success: true, message: "Subscription has been saved"})
    } 
    catch(err){
        error(err, res)
    }
}


exports.send = async (req, res) => {
    let {followers, username, amount} = req.body;
    followers = followers.map(user => user.username);
    let bananaTense = amount === 1 ? "banana" : "bananas"
    let message = `${username} just ate ${amount} ${bananaTense}!`
    try{
    for (let follower of followers){
        let sub = await selectSubscriptions(follower);
        console.log(sub, "sub");
        if(sub){
            try{
            webPush.sendNotification(sub, JSON.stringify({
                title: "Banana Alert! ",
                body: message
            }))
        }

        catch(err){
            if(err.statusCode === 410){
                await deleteNotificationSubscription(sub.endpoint);
            }
        }
    }
}

    res.json({success: true, message: "Notifications has been sent!"})
}
    catch(err){
        error(err, res)
}
}

exports.getPublicVapidKey = async (req, res) => {
    const key = process.env.PUBLIC_VAPID_KEY    
    res.json(key)
    
}
