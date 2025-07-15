import { useEffect } from "react";
import { useUser } from "../UserContextProvider";

export default function useBananaCount(){

    const {count, setCount, totalCount, setTotalCount} = useUser()

    async function fetchBananaCount() {
        const response = await fetch(`http://localhost:4747/api/get-count`,
            {
                credentials: "include"
            }
        );
        const data = await response.json();
        setCount(data.count);
        setTotalCount(data.total_count);
    }

     function setBananaCount(added_count){
        added_count = added_count > 0 ? added_count : 0
        fetch("http://localhost:4747/api/set-count", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ count: count + added_count}),
            credentials: "include"
        })
        .then(() => fetchBananaCount())
    }

    useEffect(() => {
        fetchBananaCount()
    }, []
)

    return {banana_count : count, total_banana_count: totalCount, setBananaCount }
}