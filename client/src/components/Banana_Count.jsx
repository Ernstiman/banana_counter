import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import useGetBananaCount from "../hooks/useGetBananaCount"
import { useState } from "react";

export default function BananaCount(){

    const {loadingCount} = useGetBananaCount();

    const {totalCount, count} = useUser()
    console.log(totalCount, count)


   

    if(loadingCount) return <p>Loading Banana Count...</p>
    
    return (
        <div className="banana-count-container">
        <h2 className="count">The total banana count is: {totalCount}</h2>
        <h2 className="count">Your current banana count is: {count}</h2>
        </div>
    )
}