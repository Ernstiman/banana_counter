import { useEffect, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_followers } from "../api/api";

export default function useGetUserFollowers(){

    const [loadingUserFollowers, setLoadingUserFollowers] = useState(false)
    const {setFollowing, setFollowers} = useUser();

    useEffect(() => {

        setLoadingUserFollowers(true);
        fetch_followers().then(({following_data, follower_data}) => {
            setFollowing(following_data);
            setFollowers(follower_data)
        })
        .catch(() => console.log("Something went wrong when fetching followers"))
        .finally(() => {
            setTimeout(() => setLoadingUserFollowers(false), 1000)
            });

    }, [])

    return {loadingUserFollowers}
}