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
                    
                    <Link to="/search" className="search__link">
                       <img src="/img/search-icon.png" alt="search" className="search-icon"/>
                    </Link>
                    <Link to="/friend-requests" className="friend-request-link">
                        <img src="/img/friend-request-icon.png" alt="friend-request" className="friend-request-icon" />
                    </Link>
                    <LogOut/>
                </div>
            </div>)}
        </header>
    );
}
