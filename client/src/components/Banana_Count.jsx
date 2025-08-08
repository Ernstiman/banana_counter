import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import useGetBananaCount from "../hooks/useGetBananaCount"
import { useState } from "react";
import "../style/Components/Banana_Count.css"
import { NormalLoader } from "./Loaders";

export default function BananaCount(){
    const {totalCount, count, username, setCount} = useUser();

    const {loadingCount, bananaCount} = useGetBananaCount({username});

    useEffect(() => {
        setCount(bananaCount);
    }, [bananaCount])

    if(loadingCount) return( 
    <div className="banana-count-container">
    <NormalLoader />
    </div>
    )

    return (
        <div className="banana-count-container">
        <h2 className="count">The total banana count is: {totalCount}</h2>
        <h2 className="count">Your current banana count is: {count}</h2>
        </div>
    )
}