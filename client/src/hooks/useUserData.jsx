
import { useEffect, useState } from "react"
import { useUser } from "../UserContextProvider";


export default function useUserData(user){

    const [count, setCount] = useState(0);
    const {followed, fetch_followers} = useUser();
    const follows = followed.map(user => user.username).includes(user.username);

    async function fetchData(){
        const response = await fetch(`http://localhost:4747/api/get-user-count?username=${user.username}`,
        )
        const data = await response.json();
        setCount(data.count);
    }
        useEffect(()=>{
            fetchData()
            .then(fetch_followers)
            
        }, [])

    return {count, follows}
}