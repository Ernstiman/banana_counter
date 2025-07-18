
import { useUser } from "../context/UserContextProvider.jsx";
import { useState } from "react";
import FindUsers from "../components/Find_Users.jsx";
import Followers from "../components/Followers.jsx";
import useBananaCount from "../hooks/useBananaCount.jsx";
import BananaHistory from "../components/Banana_History.jsx";
import { post_banana_history } from "../api/api.js";


export default function HomePage() {
    const {username, count, totalCount, following} = useUser();
    const [addedCount, setAddedCount] = useState(0);
    const {change_count} = useBananaCount();

    return (
        <div className="app-container">
            <div className="user-data-container">
            <h1>Welcome to the Banana Counter {username}!</h1>
            <h2 className="count">The total banana count is: {totalCount}</h2>
            <h2 className="count">Your current banana count is: {count}</h2>
            {addedCount != 0 && (<h2>{addedCount} added bananas</h2>)}
            <button onClick={() => setAddedCount(addedCount + 1)}>Add Banana</button>
            <button onClick={() => setAddedCount(addedCount - 1 > 0 ? addedCount - 1 : 0) }>Remove Banana</button>
            {addedCount != 0 && (<button onClick={() => {setAddedCount(0); change_count(addedCount); post_banana_history(addedCount)}}>Submit bananas</button>)}
            </div>
                <FindUsers/>
                <Followers/>
                <BananaHistory users={following}>Banana Activity: </BananaHistory>
                
        </div>
    )}