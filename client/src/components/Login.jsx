
export default function Login({subPass, setSubPass, subUsername, setSubUsername}){

    return (
        
        <div className="login-field">
            <label htmlFor="username" className="login-label">Username:</label>
            <input type="text" id="username" name="username" className="login-input"
                value={subUsername} onChange={(e) => setSubUsername(e.target.value)} />

            <label htmlFor="password" className="login-label">Password:</label>
            <input type="password" id="password" name="password" className="login-input"
                value={subPass} onChange={(e) => setSubPass(e.target.value)} />
        </div>
    )
}