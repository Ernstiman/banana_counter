const { getSettings, postSettings, clearSettings } = require("../db"); 


exports.get = async(req, res) => {

    const {username} = req.session;

    try{
        const settings = await getSettings(username);
        console.log(settings, "settingsController");
        res.json(settings);
    }
    catch(err){
        res.json({message: err.message});
    }
}



exports.post = async(req, res) => {
    const {settings, username} = req.body;

    try{
        await clearSettings();
        await postSettings(settings, username);
        res.json({message: "Settings posted successfully"});
    }
    catch(err){
        res.json({message: err.message});
    }
}