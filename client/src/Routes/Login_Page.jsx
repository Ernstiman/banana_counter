
import useLogin from "../hooks/useLogin.jsx";
import { useState } from "react";
import Login from "../components/Login.jsx";
import CreateAccount from "../components/CreateAccount.jsx";
import ForgotPassword from "../components/Forgot_Password.jsx";
import "../style/Routes/LoginPage.css"; // Assuming you have a CSS file for styles

export default function LoginPage() {
    
    const {login}= useLogin()
    const [subPass, setSubPass] = useState("");
    const [subUsername, setSubUsername] = useState("")
    const [createAccount ,setCreateAccount] = useState(false)
    const [subEmail ,setSubEmail] = useState("")
    const [forgotPassword, setForgotPassword] = useState(false);
    

    return(
        <div className="login-container">
            {!forgotPassword && <div className="login-form">
                <h2 className="login-title">Login</h2>
                <form onSubmit={(e) => login(e, subUsername, subPass, subEmail, createAccount)}>

                   {!createAccount && <Login 
                   subPass={subPass} 
                   setSubPass={setSubPass}
                   subUsername={subUsername}
                   setSubUsername={setSubUsername}/>}

                    {createAccount && <CreateAccount 
                    subPass={subPass} 
                    setSubPass={setSubPass} 
                    subEmail={subEmail} 
                    setSubEmail={setSubEmail} 
                    subUsername={subUsername} 
                    setSubUsername={setSubUsername} />
                    }

                    <div className="login-checkbox-field">
                        <input type="checkbox" id="create-account" checked={createAccount}
                            onChange={(e) => setCreateAccount(e.target.checked)} />
                        <label htmlFor="create-account" className="login-checkbox-label">Create account</label>
                    </div>
                    
                    <span onClick={() => setForgotPassword(true)}>Forgot Password?</span>
                    
                    <button type="submit" className="login-button" onClick={(e) => login(e, 
                        subUsername, 
                        subPass, 
                        subEmail, 
                        createAccount)}>Login</button>
                </form>
            </div>}
            {forgotPassword && <ForgotPassword setForgotPassword={setForgotPassword}/>}
        </div>
    )
}
