import { Link } from "react-router-dom"
import { useUser } from "../context/UserContextProvider"
import { LogOut } from "./Buttons"

export default function Header(){
    const {username} = useUser()
    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/home-page" className="header__link">
                    <h1 className="header__title">🍌 Banana Chat</h1>
                </Link>
            </div>
            {username && (<div className="header__right">
                <span className="header__user">{username}</span>
                <div className="header__actions">
                    <LogOut />
                </div>
            </div>)}
        </header>
    );
}
