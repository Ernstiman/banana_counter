import { useContext, useEffect, useState } from "react"
import { useUser } from "./UserContextProvider"
import { UserNav } from "./Navs";

export default function Followers(){

    const {username, fetch_followers, followers, followed} = useUser();

    useEffect(() => {
        fetch_followers();
    }, [])
    
    return (
        <div className="followers-root-container">
            <div className="followed-container">
            <h1>Following</h1>
            <ul className="followed">
                {followed && followed.map(user => (
                    <li key = {user.username} value={user.username}>
                        <UserNav targetUsername={user.username}/>
                        <p>Count: {user.count}</p>
                    </li>
                ))}
            </ul>
            </div>
            <div className="followers-container">
            <h1>Followers</h1>
            <ul className="followers">
                {followers && followers.map(user => (
                    <li key = {user.username} value={user.username}>
                        <UserNav targetUsername={user.username}/>
                        <p>Count: {user.count}</p>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}