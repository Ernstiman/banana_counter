import { postResetPasswordLink } from "../api/api"
import { useState } from "react";
import "../style/Components/ForgotPassword.css";

export default function ForgotPassword({setForgotPassword}) {
    const [subEmail, setSubEmail] = useState("");
    const [sent, setSent] = useState(false);
    async function click(e){
        e.preventDefault();
        postResetPasswordLink(subEmail)
        setSent(true);
    }
    

    return (
        <div className="forgot-password-container">
            {!sent && (
                <>
                <p>Do you want to reset your password?</p>
                <form onSubmit={e => click(e)}>
                    <input type="email" value={subEmail} onChange={(e) => setSubEmail(e.target.value)} />
                    <button type="submit">Send Reset Link</button>
                    
                </form>
                </>
            )}

            <button className="exit-button" onClick={() => setForgotPassword(false)}>Exit</button>
            {sent && <p>Password reset link sent to {subEmail}</p>}
        </div>
        
    )}
