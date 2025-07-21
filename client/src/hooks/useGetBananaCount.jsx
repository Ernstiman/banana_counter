import { useEffect, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_banana_count, post_banana_count } from "../api/api";

export default function useGetBananaCount(){

    const {setCount, setTotalCount, count} = useUser()
    const [loadingCount, setLoadingCount] = useState(false)

    
    useEffect(() => {
        setLoadingCount(true);
        fetch_banana_count()
        .then(({count, total_count}) => {
            setCount(count);
            setTotalCount(total_count)
        })
        .catch(err => console.log(err))
        .finally(() => setLoadingCount(false))
    }, []
)

    return {loadingCount}
}