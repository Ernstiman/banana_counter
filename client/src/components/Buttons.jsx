
import { useNavigate } from "react-router-dom";
import { remove_user, add_user, fetch_followers, post_friend_requests, post_banana_count, post_banana_history, fetch_banana_count } from "../api/api";
import { useUser } from "../context/UserContextProvider";
import { fetch_friend_requests } from "../api/api";


export function AcceptFriendRequestButton({targetUsername, setFriendRequests}){
    const {setFollowers, username} = useUser()
    
   async function add(targetUsername){
        await add_user(targetUsername)
        await fetch_followers().then(data => {
            setFollowers(data.follower_data)})
        await post_friend_requests(targetUsername, username, false);
        setFriendRequests(await fetch_friend_requests(username));
    }

    return(
        <button className="accept-friend-request-button" onClick={() => add(targetUsername)}>
            Accept
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
        <button className="remove-user-button" onClick={() => remove(targetUsername)}>
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
        <button className="log-out-button" onClick={()=>logOut()}>Log Out</button>
    )
}

export function DeclineFriendRequestButton({targetUsername, setFriendRequests}){
    const {username} = useUser()
    return (
        <button className="decline-friend-request-button" onClick={() => {post_friend_requests(targetUsername, username, false)
            .then(() => fetch_friend_requests(username))
            .then(data => setFriendRequests(data));}}>Decline</button>

    )
}

export function SendFriendRequestButton({targetUsername, setFriendRequests}){
    const {username} = useUser();
    async function click(){
        await post_friend_requests(username, targetUsername, true)
        setFriendRequests(await fetch_friend_requests(targetUsername));

    }
    return (
        <button className="send-friend-request-button" onClick={click}>Send Friend Request</button>
    )
}

export function AddBananaButton({addedCount, setAddedCount}){


    return(
        <button className="add-banana-count-button" onClick={() => setAddedCount(addedCount + 1)}>+</button>
    )
}

export function SubtractBananaButton({addedCount, setAddedCount}){

    function click(){
        if(addedCount > 0){
            setAddedCount(addedCount - 1)
        }
    }
    return (
        <button className="subtract-banana-button" onClick={click}>-</button>
    )
}

export function SubmitBananasButton({addedCount, setAddedCount}){
    const {count, setCount, setTotalCount} = useUser()
    async function click(){
        setAddedCount(0);
        await post_banana_count(count + addedCount);
        await post_banana_history(addedCount);
        await fetch_banana_count()
        .then(({count, total_count}) => {
            setCount(count);
            setTotalCount(total_count);
        })
        .catch(err => console.log(err));
    }
    return (
        <>
        {addedCount > 0 && (<button className="submit-banana-button"onClick={click}>Submit Bananas</button>)}  
        </>)
}

