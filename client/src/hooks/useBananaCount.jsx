import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import { fetch_banana_count, post_banana_count } from "../api/api";

export default function useBananaCount(){

    const {setCount, setTotalCount, count} = useUser()

    async function get_count(){
        const {count, total_count} = await fetch_banana_count()
        setCount(count);
        setTotalCount(total_count);
    }

    async function change_count(added_count){
        added_count = added_count > 0 ? added_count : 0
        await post_banana_count(count + added_count)
        await get_count()
    }

    useEffect(() => {
        get_count()
    }, []
)

    return {change_count}
}