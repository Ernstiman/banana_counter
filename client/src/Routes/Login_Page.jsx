
import useLogin from "../hooks/useLogin.jsx";
import { useState } from "react";

export default function LoginPage() {
    
    const {login}= useLogin()
    const [subPass, setSubPass] = useState("");
    const [subUsername, setSubUsername] = useState("")
    const [createAccount ,setCreateAccount] = useState(false)
    

    return(
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Login</h2>
                <form onSubmit={(e) => login(e, subUsername, subPass, createAccount)}>
                    <div className="login-field">
                        <label htmlFor="username" className="login-label">Username:</label>
                        <input type="text" id="username" name="username" className="login-input"
                            value={subUsername} onChange={(e) => setSubUsername(e.target.value)} />
                    </div>
                    <div className="login-field">
                        <label htmlFor="password" className="login-label">Password:</label>
                        <input type="password" id="password" name="password" className="login-input"
                            value={subPass} onChange={(e) => setSubPass(e.target.value)} />
                    </div>
                    <div className="login-checkbox-field">
                        <input type="checkbox" id="create-account" checked={createAccount}
                            onChange={(e) => setCreateAccount(e.target.checked)} />
                        <label htmlFor="create-account" className="login-checkbox-label">Create account</label>
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    )
}
