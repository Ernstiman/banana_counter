import { useState, useEffect } from "react";
import { fetch_friend_requests } from "../api/api";

export default function useGetFriendRequests(username){
    const [friendRequests, setFriendRequests] = useState([]);
    const [loadingFriendRequests, setLoadingFriendRequests] = useState(true);

    useEffect(() => {
        setLoadingFriendRequests(true);
        if(username){
            fetch_friend_requests(username)
        .then(data => setFriendRequests(data))
        .catch(err => console.log("Something went wrong when getting friend reqeusts", err))
        .finally(() => setLoadingFriendRequests(false))}
    }, [username])

    return {loadingFriendRequests, friendRequests, setFriendRequests}
}