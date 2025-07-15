import { Link } from "react-router-dom";

export function UserNav({targetUsername}){

    return (
        <nav>
            <Link to={`/user/${targetUsername}`}>
            <p>{targetUsername}</p>
            </Link>
        </nav>
    )
}