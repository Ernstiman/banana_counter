
export default function CreateAccount({subPass, setSubPass, subEmail, setSubEmail, subUsername, setSubUsername}){

    return (
        <div className="create-account-field">
            <label htmlFor="username" className="login-label">Username:</label>
            <input type="text" id="username" name="username" className="login-input"
                value={subUsername} onChange={(e) => setSubUsername(e.target.value)} />
            <label htmlFor="password" className="login-label">Password:</label>
            <input type="password" id="password" name="password" className="login-input"
                value={subPass} onChange={(e) => setSubPass(e.target.value)} />
            <label htmlFor="email" className="login-label">Email:</label>
            <input type="text" id="email" name="email" className="email-input"
                value={subEmail} onChange={(e) => setSubEmail(e.target.value)} />
        </div>
    )
}