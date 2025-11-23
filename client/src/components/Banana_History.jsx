import { useEffect, useState } from "react";
import useBananaHistory from "../hooks/useBananaHistory";
import { useUser } from "../context/UserContextProvider";
import useGetBananaHistory from "../hooks/useBananaHistory";
import { NormalLoader } from "./Loaders";
import "../style/Components/BananaHistory.css";
import { useInView } from "react-intersection-observer";

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

export default function BananaHistory({users, children}) {
    const { bananaHistory, loadingBananaHistory } = useGetBananaHistory(users);
    const {ref, inView, entry} = useInView();

    useEffect(() => {
        console.log("Loader in view " + inView)
    }, [inView]);

    if (loadingBananaHistory) return (
    <div className="banana-history-container">
        <NormalLoader />
    </div>)
    return (
        <div className="banana-history-container">
            <h1>{children}</h1>
            <ul className="banana-history-list scroll-list">
                {bananaHistory && bananaHistory.length > 0 ? (
                    bananaHistory.map((entry, i) => (
                        <li key={i} className="banana-history-item">
                            <span className="banana-history-username">{entry.username}</span>
                            <span className="banana-history-action">
                                ate <strong>{entry.amount}</strong> bananas
                            </span>
                            <span className="banana-history-caption">{entry.caption}</span>
                            <span className="banana-history-date">
                                on {setDate(entry.timestamp)} at {setTime(entry.timestamp)}
                            </span>
                            

                        </li>
                        
                    ))
                ) : (
                    <li className="banana-history-item no-history">No banana history found.</li>
                )}
                <div ref = {ref}>
                    <NormalLoader/>
                </div>
            </ul>
        </div>
    );
}