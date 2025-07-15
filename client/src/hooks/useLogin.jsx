import { useUser } from "../UserContextProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function useLogin(){

    const navigate = useNavigate();
    const {setUsername} = useUser();
    const [subUsername, setSubUsername] = useState("");
    const [password, setPassword] = useState("");
    const [createAccount, setCreateAccount] = useState(false);

    async function login(event) {
        event.preventDefault();
        const req = await fetch(`http://localhost:4747/api/login/post?create_account=${createAccount}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: subUsername, password }),
            credentials: "include"
        });
        const data = await req.json();
        if (data.success && ! createAccount) {
            navigate("/home-page");
        }
        else{
            alert(data.message);
        }
    }

    useEffect(()=>{
        setUsername("");
    },[])

    return {setSubUsername, subUsername, password, setPassword, createAccount,setCreateAccount, login}
        
}