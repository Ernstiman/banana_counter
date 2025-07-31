import React, { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {BananaLoader} from "../components/Loaders";



const UserContext = React.createContext();
export function UserContextProvider({children}){
    const navigator = useNavigate()
    const [username, setUsername] = useState("");
    const [count, setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()
    let location = useLocation();

    useEffect(() =>{
        const publicPaths = ["/login", "/change-password"]
        const isPublic = publicPaths.some(path => location.pathname.startsWith(path));
        if(!username && !isPublic){
            fetch("api/auth/me",
                {credentials: "include"}
            ).then(res => res.json())
            .then(data => {
                if(data.username){
                setUsername(data.username)}
                else{
                    navigator("/login")
                }})
            .catch(err => console.log(err))
        }
    }, [location.pathname]);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {setLoading(false)}, 500);
    }, [location])
    
    if(loading) return <BananaLoader/>

    return ( 
        <UserContext.Provider value={{username, setUsername, 
        count, setCount, 
        totalCount, setTotalCount,
        followers, 
        following,
        setFollowers,
        setFollowing,
        email,
        setEmail}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext);
}