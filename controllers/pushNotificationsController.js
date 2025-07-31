const webPush = require("web-push");
const { insertNotificationSubscription, selectSubscriptions, deleteNotificationSubscription } = require("../db");
const {error} = require("../utils.js")

webPush.setVapidDetails(
    "mailto:viktor@ekastigen.net",
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

exports.subscribe = async (req, res) => {
    const {user_id, endpoint, keys} = req.body;
     if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
        return res.status(400).json({ error: "Invalid subscription format" });
    }

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
        let sub_array = await selectSubscriptions(follower);
        for (let sub of sub_array){
            console.log(sub, "sub in send")
            sub = {endpoint: sub.endpoint, keys: {p256dh: sub.p256dh, auth: sub.auth}}
        if(sub){
            try{
            console.log("Sending notification to", follower);
            console.log(sub, "sub")
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
}

    res.json({success: true, message: "Notifications has been sent!"})
}
    catch(err){
        error(err, res)
}
}

exports.getPublicVapidKey = async (req, res) => {
    const key = process.env.PUBLIC_VAPID_KEY    
    res.json({key});

}
