import { useParams } from "react-router-dom";
import { RemoveUserButton, SendFriendRequestButton } from "../components/Buttons";
import { useUser } from "../context/UserContextProvider";
import { useEffect, useState } from "react";
import { fetch_banana_count, follow } from "../api/api";
import BananaHistory from "../components/Banana_History";
import useGetFriendRequests from "../hooks/useGetFriendRequests";
import useGetUserFollowers from "../hooks/useGetUserFollowers";
import { useMemo } from "react";
import ProfilePageHead from "../components/ProfilePageHead";
import "../style/Routes/UserPage.css"; // Assuming you have a CSS file for styles


export default function UserPage(){
    const {userUsername} = useParams()
    const [count, setCount] = useState(0);
    const {following, username} = useUser();
    const [follows, setFollows] = useState(false);
    const [pendingFriendRequest, setPendingFriendRequest] = useState(false)
    const {friendRequests, setFriendRequests} = useGetFriendRequests(userUsername);
    useGetUserFollowers()


    const memoUsername = useMemo(() => {
        return [{username: userUsername}]
    }, [userUsername]);
    
    useEffect(()=>{
        if(following){
            setFollows(following.map(user => user.username).includes(userUsername))
        }
    }
        ,[following, username])
 

    useEffect(() => {
                    setPendingFriendRequest(friendRequests.includes(username))
    }, [friendRequests])


    return (
        <div className="user-container">
            <ProfilePageHead username={userUsername} />

            {follows ? 
            <RemoveUserButton targetUsername={userUsername}/>
            :
            pendingFriendRequest ? 
            <p>Friend request has been sent</p>
            :
            <SendFriendRequestButton targetUsername={userUsername} setFriendRequests={setFriendRequests}/>
            }
            {follows && <BananaHistory users={memoUsername}>{userUsername}'s Banana Activity</BananaHistory>}
        </div>
    )
}