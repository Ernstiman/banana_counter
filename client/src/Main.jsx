import { useContext } from "react"
import { userContext } from "./App.jsx";
import { useEffect } from "react";


export default function Main() {
    const { username, count, setCount } = useContext(userContext);

    async function fetchBananaCount() {
        const response = await fetch("http://localhost:4747/api/get-count",
            {
                credentials: "include"
            }
        );
        const data = await response.json();
        setCount(data.count);
    }
    async function updateBananaCount(newCount) {
        setCount(newCount);
        const response = await fetch("http://localhost:4747/api/set-count", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ count: newCount }),
            credentials: "include"
        });
    }

    useEffect(() => {
        fetchBananaCount();
    }, []);

    return (
        <div className="app-container">
            <h1>Welcome to the Banana Counter {username}!</h1>
            <h2>Your current banana count is: {count}</h2>
            <button onClick={() => updateBananaCount(count + 1)}>Add Banana</button>
            <button onClick={() => updateBananaCount(count - 1)}>Remove Banana</button>
        </div>
    )}