import React, { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";



const UserContext = React.createContext();
export function UserContextProvider({children}){
    const [username, setUsername] = useState("");
    const [count, setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    let location = useLocation();

    useEffect(() =>{
        if(!username){
            fetch("http://localhost:4747/api/me",
                {credentials: "include"}
            ).then(res => res.json())
            .then(data => setUsername(data.username))
            .catch(err => console.log(err))
        }
    }, [location.pathname]);
    
    return ( 
        <UserContext.Provider value={{username, setUsername, 
        count, setCount, 
        totalCount, setTotalCount,
        followers, 
        following,
        setFollowers,
        setFollowing}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext);
}