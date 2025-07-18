
import { useNavigate } from "react-router-dom";
import useFollowers from "../hooks/useFollowers"
import { remove_user, add_user, fetch_followers } from "../api/api";
import { useUser } from "../context/UserContextProvider";


export function AddUserButton({targetUsername}){
    const {setFollowing} = useUser()
   async function add(targetUsername){
        await add_user(targetUsername)
        await fetch_followers().then(data => {
            setFollowing(data.following_data)})
    }

    

    return(
        <button className="add-user" onClick={() => add(targetUsername)}>
            Add User
        </button>
    )
}

export function RemoveUserButton({targetUsername}){
    const {setFollowing} = useUser()
    async function remove(targetUsername){
        await remove_user(targetUsername)
        await fetch_followers().then(data => setFollowing(data.following_data))

    }
    return(
        <button className="remove-user" onClick={() => remove(targetUsername)}>
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

