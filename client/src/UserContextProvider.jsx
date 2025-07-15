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
    const [followed, setFollowed] = useState([]);
    let location = useLocation();

    async function fetch_followers(){
        const response = await fetch("http://localhost:4747/api/get-follower",
            {credentials: "include"}
        );
        const {followed_data, follower_data} = await response.json();
        setFollowers(follower_data);
        setFollowed(followed_data);
    }

    async function add_user(targetUsername){
         await fetch("http://localhost:4747/api/set-follower",{
         credentials: "include",
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({followed: targetUsername})
      });
      fetch_followers()

   }

   async function remove_user(targetUsername){
        await fetch("http://localhost:4747/api/remove-follower",{
            credentials: "include",
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({followed: targetUsername})
        });
        fetch_followers();
   }


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
        fetch_followers, add_user,
        remove_user,
        followers,
        followed}}>

            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext);
}