
import { useNavigate } from "react-router-dom";
import { useState } from "react";   
import React, { useContext } from "react";
import { userContext } from "./App.jsx";

export default function Login() {
    const navigate = useNavigate();
    const {setUsername, username } = useContext(userContext);
    const [password, setPassword] = useState("");
    const [createAccount, setCreateAccount] = useState(false);

    async function login(event) {
        event.preventDefault();
        const req = await fetch(`http://localhost:4747/api/login/post?create_account=${createAccount}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: "include"
        });
        const data = await req.json();
        if (data.success && ! createAccount) {
            navigate("/main");
        }
        else{
            alert(data.message);
        }
    }

    return(
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={login}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="create-account">Create account</label>
                        <input type="checkbox" id="create-account" checked={createAccount} onChange={(e) => setCreateAccount(e.target.checked)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )}