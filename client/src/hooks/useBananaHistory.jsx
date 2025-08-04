import { useEffect, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_banana_history } from "../api/api";
import BananaHistory from "../components/Banana_History";


export default function useGetBananaHistory(users){   
    const [bananaHistory, setBananaHistory] = useState([]);
    const [loadingBananaHistory, setLoadingBananaHistory] = useState(false);
    
    useEffect(() => {
        setLoadingBananaHistory(true)
        if(users && users.length > 0){
             fetch_banana_history(users)
             .then((banana_history) => {
                setBananaHistory(banana_history)})
            }
            setLoadingBananaHistory(false)   
    }, [users])

    return {bananaHistory, loadingBananaHistory}
}
