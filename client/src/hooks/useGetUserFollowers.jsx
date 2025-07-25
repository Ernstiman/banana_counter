import { useEffect, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_followers, fetch_following } from "../api/api";

export default function useGetUserFollowers(){

    const [loadingUserFollowers, setLoadingUserFollowers] = useState(false)
    const {setFollowing, setFollowers, username} = useUser();
    
    useEffect(() => {
        if(username){
        setLoadingUserFollowers(true);
        
        fetch_followers(username).then(({followers}) => {
            setFollowers(followers)
        })
        .then(fetch_following(username).then(({following}) => {
            setFollowing(following);
        }))
        .catch(() => console.log("Something went wrong when fetching followers"))
        .finally(() => {
            setTimeout(() => setLoadingUserFollowers(false), 1000)
            });
        }

    }, [username])

    return {loadingUserFollowers}
}