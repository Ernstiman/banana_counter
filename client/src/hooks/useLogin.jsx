import { useUser } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { post_login } from "../api/api";

export default function useLogin(){

    const navigate = useNavigate();
    const {setUsername} = useUser();

    async function login(event, username, password, createAccount) {
        event.preventDefault();
        const {success, message} = await post_login(username, password, createAccount)
        if (success && ! createAccount) {
            setUsername(username)
            navigate("/home-page");
        }
        else{
            alert(message);
        }
    }

    useEffect(()=>{
        setUsername("");
    },[])

    return {login}
        
}