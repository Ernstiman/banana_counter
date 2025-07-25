import { useParams } from "react-router-dom";
import { RemoveUserButton, SendFriendRequestButton } from "../components/Buttons";
import { useUser } from "../context/UserContextProvider";
import { useEffect, useState } from "react";
import { fetch_banana_count, follow } from "../api/api";
import BananaHistory from "../components/Banana_History";
import useGetFriendRequests from "../hooks/useGetFriendRequests";
import useGetUserFollowers from "../hooks/useGetUserFollowers";

export default function UserPage(){
    const {userUsername} = useParams()
    const [count, setCount] = useState(0);
    const {following, username} = useUser();
    const [follows, setFollows] = useState(false);
    const [pendingFriendRequest, setPendingFriendRequest] = useState(false)
    const {friendRequests, setFriendRequests} = useGetFriendRequests(userUsername);
    useGetUserFollowers()


    useEffect(()=>{
            setFollows(following.includes(userUsername))}
        ,[following])
 

    useEffect(() => {
                    setPendingFriendRequest(friendRequests.includes(username))
    }, [friendRequests])

    useEffect(() => {
         fetch_banana_count([userUsername]).then((count) => {
            setCount(count.count[0].count)})
    }, [userUsername])
    return (
        <div className="user-container">
            <h1>{userUsername}</h1>
            <h2>Banana count: {count}</h2>

            {follows ? 
            <RemoveUserButton targetUsername={userUsername}/>
            :
            pendingFriendRequest ? 
            <p>Friend request has been sent</p>
            :
            <SendFriendRequestButton targetUsername={userUsername} setFriendRequests={setFriendRequests}/>
            }
            {follows && <BananaHistory users={[{username: userUsername}]}>{userUsername}'s Banana Activity</BananaHistory>}
        </div>
    )
}