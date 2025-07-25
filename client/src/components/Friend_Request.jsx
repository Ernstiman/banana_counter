
import {AcceptFriendRequestButton, DeclineFriendRequestButton } from "./Buttons"

export default function FriendRequest({sender, setFriendRequests}){
    return (
        <div className="friend-request-container">
            <p>{sender} wants to be your friend!</p>
            <AcceptFriendRequestButton targetUsername={sender} setFriendRequests = {setFriendRequests}/>
            <DeclineFriendRequestButton targetUsername={sender} setFriendRequests = {setFriendRequests}/>
        </div>
    )
}