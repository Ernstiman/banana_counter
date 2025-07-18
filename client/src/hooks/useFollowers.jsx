import { useEffect, useState } from "react"
import { useUser } from "../context/UserContextProvider"
import { fetch_followers } from "../api/api"

export default function useFollowers(){
const {setFollowers, setFollowing} = useUser();
const [loading, setLoading] = useState(false);

useEffect(() => {
    setLoading(true)
    fetch_followers().then(data =>
    {setFollowers(data.follower_data)
        setFollowing(data.followed_data)
    }
    ).catch(err => console.log(err))
    .finally(() => setLoading(false))

}, [])
    return {loading}
}