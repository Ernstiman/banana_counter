import { useState, useEffect } from "react";
import { fetchPasswordReset, putNewPassword} from "../api/api";
import { useParams } from "react-router-dom";
import "../style/Routes/ChangePassword.css";

export default function ChangePassWord(){
    const [newPassword, setNewPassword] = useState("");
    const { token } = useParams();
    const [validToken, setValidToken] = useState(false);
    const [subEmail, setSubEMail] = useState("");
    const [changed, setChanged] = useState(false)

    async function handleChangePassword(event){
        event.preventDefault();
        const data = await putNewPassword(subEmail, newPassword);
        alert(data.message);
        setChanged(true)
    }

    useEffect(() => {
        fetchPasswordReset(token)
            .then(({success, email}) => {
                if(success){
                    setSubEMail(email);
                    setValidToken(true);
                }
            });
    }, [token]);

    if(!validToken){
        return <p>Invalid link</p>
    }

    return (
        <div className="change-password-container">
            {!changed && (<form onSubmit={handleChangePassword}>
                <label htmlFor="password">Enter new password</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    className="password-input"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <button type="submit">Change Password</button>
            </form>)}
            {changed && (<p>Password has been changed!</p>)}
        </div>
    )
}