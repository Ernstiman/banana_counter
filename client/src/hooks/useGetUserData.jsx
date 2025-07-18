import { useEffect, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_followers } from "../api/api";

export default function useGetUserData(){

    const [loading, setLoading] = useState(true)
    const {following, setFollowing, followers, setFollowers} = useUser();

    useEffect(() => {

        setLoading(true);
        fetch_followers().then(({following_data, followers_data}) => {
            setFollowing(following_data);
            setFollowers(followers_data)
        })
        .catch(err => console.log("Something went wrong when fetching followers"))
        .finally(() => setLoading(false));

    }, [])

    return {loading}
}