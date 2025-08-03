import { useEffect, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_banana_count, post_banana_count } from "../api/api";

export default function useGetBananaCount(){

    const [bananaCount, setBananaCount] = useState()
    const {setCount, setTotalCount, count, username} = useUser()
    const [loadingCount, setLoadingCount] = useState(false)
    
    useEffect(() => {
        if(username){
        setLoadingCount(true);
        fetch_banana_count([username])
        .then(({count, totalCount}) => {
            setCount(count);
            setTotalCount(totalCount)
        })
        .catch(err => console.log(err))
        .finally(() => setLoadingCount(false))
    }
    }, [username]
    )


    return {loadingCount}
}