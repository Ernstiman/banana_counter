const { getSettings, postSettings } = require("../db"); 


exports.get = async(req, res) => {

    const {username} = req.session;

    try{
        const settings = await getSettings(username);
        res.json(settings);
    }
    catch(err){
        res.json({message: err.message});
    }
}



exports.post = async(req, res) => {
    const {settings, username} = req.body;

    try{
        await postSettings(darkMode);
        res.json({message: "Settings posted successfully"});
    }
    catch(err){
        res.json({message: err.message});
    }
}