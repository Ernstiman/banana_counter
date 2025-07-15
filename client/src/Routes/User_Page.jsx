import { useParams } from "react-router-dom";
import { AddUserButton, RemoveUserButton } from "../Buttons";
import useUserData from "../hooks/useUserData";
export default function UserPage(){
    const user = useParams()
    const {count, follows} = useUserData(user);

    return (
        <div className="user-container">
            <h1>{user.username}</h1>
            <h2>Banana count: {count}</h2>
            {!follows ? 
            <AddUserButton targetUsername={user.username}/>
            :<RemoveUserButton targetUsername={user.username}/>}
        </div>
    )
}