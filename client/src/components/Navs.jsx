import { Link } from "react-router-dom";
import { useUser } from "../context/UserContextProvider";
import "../style/Components/Navs.css";

export function UserNav({targetUsername}){

    return (
        <nav>
            <Link to={`/user/${targetUsername}`}>
            <p>{targetUsername}</p>
            </Link>
        </nav>
    )
}

export function CurrentUserNav(){
    const {username} = useUser()
    return (
        <div className="current-user-container">
        <nav>
            <Link to={`/current-user`}>
                <p className="current-user-name">{username}</p>
            </Link>

        </nav>
        </div>
    )
}