import { useContext } from "react"
import { useUser } from "../UserContextProvider.jsx";
import { useEffect, useState } from "react";
import FindUsers from "../Find_Users.jsx";
import Followers from "../Followers.jsx";
import useBananaCount from "../hooks/useBananaCount.jsx";


export default function HomePage() {
    const {username} = useUser();
    const [addedCount, setAddedCount] = useState(0);
    const {banana_count, total_banana_count, setBananaCount} = useBananaCount()

    return (
        <div className="app-container">
            <div className="user-data-container">
            <h1>Welcome to the Banana Counter {username}!</h1>
            <h2 className="count">The total banana count is: {total_banana_count}</h2>
            <h2 className="count">Your current banana count is: {banana_count}</h2>
            {addedCount != 0 && (<h2>{addedCount} added bananas</h2>)}
            <button onClick={() => setAddedCount(addedCount + 1)}>Add Banana</button>
            <button onClick={() => setAddedCount(addedCount - 1 > 0 ? addedCount - 1 : 0) }>Remove Banana</button>
            <button onClick={() => {setAddedCount(0); setBananaCount(addedCount)}}>Submit bananas</button>
            </div>

            <div className="add-users-container">
                <FindUsers/>
            </div>
            <div className="followers-container">
                <Followers/>
            </div>
        </div>
    )}