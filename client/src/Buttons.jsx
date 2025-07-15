import {useUser} from "./UserContextProvider"
import { useNavigate } from "react-router-dom";


export function AddUserButton({targetUsername}){

    const {add_user} = useUser();
    return(
        <button className="add-user" onClick={() => add_user(targetUsername)}>
            Add User
        </button>
    )
}

export function RemoveUserButton({targetUsername}){

    const {remove_user} = useUser();
    return(
        <button className="remove-user" onClick={() => remove_user(targetUsername)}>
            Remove User
        </button>
    )
}

export function LogOut(){
    const navigate = useNavigate()
    async function logOut(){
        await fetch("http://localhost:4747/api/logout",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })

        navigate("/login")
    }
    return (
        <button onClick={()=>logOut()}>Log Out</button>
    )
}

