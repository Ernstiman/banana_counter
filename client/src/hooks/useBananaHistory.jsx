import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_banana_history } from "../api/api";
import BananaHistory from "../components/Banana_History";


export default function useGetBananaHistory(users, state = null){   
    const [bananaHistory, setBananaHistory] = useState([]);
    const [loadingBananaHistory, setLoadingBananaHistory] = useState(false);
    const currentlyLoading = useRef(false);
    const [offset , setOffset] = useState(0);
    const [pageSize] = useState(10);
    const [hasMore, setHasMore] = useState(false);

    const fetch = useCallback(async () => {
            if(!currentlyLoading.current){
                currentlyLoading.current = true;
                let history = await fetch_banana_history(users, offset);
                setBananaHistory((prev) => [...prev, ...history]);
                setOffset((prev) => prev + history.length);
                console.log(history.length);
                setHasMore(history.length >= pageSize);
                currentlyLoading.current = false;
            }
    }, [users, offset, pageSize])

    useEffect(() => {
        if(users && users.length > 0){
            fetch();
            }
        return;   
    }, [users])

    const getMore = useCallback(async () => {
            await fetch();
    }, [fetch])

    return {bananaHistory, loadingBananaHistory, getMore, hasMore}
}
