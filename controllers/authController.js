const { check_login, insert_login } = require("../db");
const { rövarencrypt } = require("../utils");

exports.postLogin = async (req, res) => {
    let {password, username} = req.body;
    password = rövarencrypt(password);

    if (!username || !password) {
        return res.json({ message: "Missing username or password" });
    }
    
    try {
        if(await check_login(username, password)){
        req.session.username = username;
        return res.json({success: true, message: "you are logged in"})
        

    }
    throw new Error("Login failed");
}
    catch (err) {
        res.json({success: false, message: "Incorrect username or password"})
    }
}

exports.createAccount = async (req, res) => {
    let {password, username} = req.body;
    password = rövarencrypt(password);
    try {
        await insert_login(username, password);
        res.json({success: true, message: "Account has been created!"});
    } catch (err) {
        res.json({success: false, message: "Account with this username already exists"})
    }
    }

exports.getAccountDetails = async (req, res) => {
    const username = req.session.username;
    res.json({username})
}

exports.logOut = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.json({ success: false, message: "Failed to log out" });
        }
        res.clearCookie("connect.sid");
        res.json({ success: true, message: "Logged out successfully" });
    });
}

