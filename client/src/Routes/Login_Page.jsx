
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
                <h2>Login</h2>
                <form onSubmit={(e) => login(e, subUsername, subPass, createAccount)}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={subUsername} onChange={(e) => setSubUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={subPass} onChange={(e) => setSubPass(e.target.value)} />
                        <label htmlFor="create-account">Create account</label>
                        <input type="checkbox" id="create-account" checked={createAccount} onChange={(e) => setCreateAccount(e.target.checked)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )}