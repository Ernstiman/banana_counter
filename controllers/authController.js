const { check_login, insert_login, insertPasswordReset, changePassword, getPasswordReset, deletePasswordReset } = require("../db");
const { rövarencrypt } = require("../utils");
const nodemailer = require("nodemailer");

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
    let {password, username, email} = req.body;
    password = rövarencrypt(password);
    try {
        await insert_login(username, password, email);
        res.json({success: true, message: "Account has been created!"});
    } catch (err) {
        console.error(err);
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

exports.changePassword = async (req, res) => {
    const {email, newPassword} = req.body;
    try {
        await changePassword(email, rövarencrypt(newPassword));
        await deletePasswordReset(email);
        res.json({success: true, message: "Password changed successfully"});
    } catch (err) {
        console.error(err);
        res.json({success: false, message: "Failed to change password"});
    }
}

exports.forgotPasswordLink = async (req, res) => {
    const {email} = req.body;
    try {
        
        const token = Math.random().toString(36).substring(2, 15);
        const expire = new Date(Date.now() + 3600000); // 1 hour
        await insertPasswordReset(email, token, expire);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'viktor@ekastigen.net',
                pass: 'jluu khyh gxrz snei'
            }
        });

        const mailOptions = {
            from: 'viktor@ekastigen.net',
            to: email,
            subject: 'Password Reset',
            text: `Here is your password reset link: http://localhost:5173/change-password/${token}`
        };

        await transporter.sendMail(mailOptions);
        res.json({success: true, message: "Password reset link sent to your email"});
    } catch (err) {
        res.json({success: false, message: "Failed to send password reset link"});
    }
}

exports.getResetPassword = async (req, res) => {
    const {token} = req.query;
    try {
        const email = await getPasswordReset(token);
        if (!email) {
            return res.json({success: false, email: null, message: "The link is invalid or expired"});
        }
        
        res.json({ success: true, email, message: "Valid token" });
        
    } catch (err) {
        console.log(err);
        res.json({ success: false, email: null, message: "Failed to validate token" });
    }
}
