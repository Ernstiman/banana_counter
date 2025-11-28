import { useEffect, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_banana_history } from "../api/api";
import BananaHistory from "../components/Banana_History";


export default function useGetBananaHistory(users, state = null){   
    const [bananaHistory, setBananaHistory] = useState([]);
    const [loadingBananaHistory, setLoadingBananaHistory] = useState(false);
    const [offset , setOffset] = useState(0);
    const [pageSize] = useState(10);

    useEffect(() => {
        setLoadingBananaHistory(true)
        if(users && users.length > 0){
             fetch_banana_history(users, offset)
             .then((banana_history) => {
                if(banana_history.length >= pageSize){
                    setBananaHistory((prev) => [...prev, ...banana_history]);
                    setOffset((prev) => prev += pageSize)
                }
            })
            }
            setLoadingBananaHistory(false)   
    }, [users, state])

    return {bananaHistory, loadingBananaHistory}
}
