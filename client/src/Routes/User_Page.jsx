import { useParams } from "react-router-dom";
import { AddUserButton, RemoveUserButton } from "../components/Buttons";
import { useUser } from "../context/UserContextProvider";
import { useEffect, useState } from "react";
import { fetch_followers, fetch_user_data } from "../api/api";
import useGetUserData from "../hooks/useGetUserData";
import BananaHistory from "../components/Banana_History";

export default function UserPage(){
    const {username} = useParams()
    const [count, setCount] = useState(0);
    const {following, setFollowing} = useUser();
    const [follows, setFollows] = useState(false);
    const {loading} = useGetUserData();

    useEffect(()=>{
            if(!loading){
            setFollows(following.map(user => user.username).includes(username))}}
        ,[following])
 
    useEffect(() => {
         fetch_user_data(username).then((count) => setCount(count))
    }, [])
    return (
        <div className="user-container">
            <h1>{username}</h1>
            <h2>Banana count: {count}</h2>

            {!follows ? 
            <AddUserButton targetUsername={username}/>
            :
            <RemoveUserButton targetUsername={username}/>}

            {following.map(user => user.username).includes(username) 
            && <BananaHistory users={[{username}]}>{username}'s Banana Activity</BananaHistory>}
            
        </div>
    )
}