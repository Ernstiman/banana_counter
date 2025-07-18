import { useEffect, useState } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_banana_history } from "../api/api";

export default function useBananaHistory(users){   
    const [usersHistory, setUsersHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    
    async function get_banana_history(){
        let banana_history = await fetch_banana_history(users);
        setUsersHistory(banana_history);
    }

    useEffect(() => {
        setLoading(true)
        if(users && users.length > 0){
             get_banana_history()
             .then(setLoading(false))}
    }, [users])

    return {usersHistory, loading}
}