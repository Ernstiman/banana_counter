import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_banana_history } from "../api/api";
import BananaHistory from "../components/Banana_History";


export default function useGetBananaHistory(users, state = null){   
    const [bananaHistory, setBananaHistory] = useState([]);
    const [loadingBananaHistory, setLoadingBananaHistory] = useState(false);
    const currentlyLoading = useRef(false);
    const [offset , setOffset] = useState(0);
    const [pageSize] = useState(10);

    useEffect(() => {
        setLoadingBananaHistory(true)
        if(users && users.length > 0 && !currentlyLoading.current){
            currentlyLoading.current = true;
             fetch_banana_history(users, offset)
             .then((banana_history) => {
                setBananaHistory((prev) => [...prev, ...banana_history]);
                setOffset((prev) => prev += pageSize);
            })
            .finally(() => {
                currentlyLoading.current = false;
                setLoadingBananaHistory(false)
            })
            }
               
    }, [users, state])

    return {bananaHistory, loadingBananaHistory}
}
