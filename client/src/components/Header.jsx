import { Link } from "react-router-dom"
import { useUser } from "../context/UserContextProvider"
import { LogOut } from "./Buttons"

export default function Header(){
    const {username} = useUser()
    return (
        username && (
        <div className="header-container">
            <div className="logo-contaiener">
                <Link to="/home-page">
                <h1>Banana Chat!</h1>
                </Link>
            </div>
            <LogOut/>
        </div>))}
