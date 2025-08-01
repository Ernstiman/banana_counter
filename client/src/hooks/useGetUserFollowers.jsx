import { useEffect, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_followers, fetch_following } from "../api/api";

export default function useGetUserFollowers(){

    const [loadingUserFollowers, setLoadingUserFollowers] = useState(false)
    const {setFollowing, setFollowers, username} = useUser();
    
    useEffect(() => {
        if(username){
        setLoadingUserFollowers(true);
        
        fetch_followers(username).then(({userData}) => {
            setFollowers(userData)
        })
        .then(fetch_following(username).then(({userData}) => {
            setFollowing(userData);
        }))
        .catch(() => console.log("Something went wrong when fetching followers"))
        .finally(() => {
            setLoadingUserFollowers(false)})
        }

    }, [username])

    return {loadingUserFollowers}
}