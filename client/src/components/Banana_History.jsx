import { useEffect, useState } from "react";
import useBananaHistory from "../hooks/useBananaHistory";
import { useUser } from "../context/UserContextProvider";

function setTime(timestamp){
    return new Date(timestamp).toLocaleTimeString("en-US", {
        timeZone: "Europe/Stockholm",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
    })
}

function setDate(timestamp){
    return new Date(timestamp).toLocaleDateString("en-US",{
        timeZone: "Europe/Stockholm",
        month: "long",
        day: "2-digit"

    })
}

export default function BananaHistory({users, children}){
    const {usersHistory, loading} = useBananaHistory(users);

    if (!loading) return (
        <div className="banana-history-container">
            <h1>{children}</h1>
            <ul>    
                {usersHistory && usersHistory.map((user, i) => (
                    <li key={i}>{user.username} ate {user.amount} bananas on {setDate(user.timestamp)} at {setTime(user.timestamp)}</li>
                ))}
            </ul>
        </div>
    )
    return (
        <p>Loading...</p>
    )
}