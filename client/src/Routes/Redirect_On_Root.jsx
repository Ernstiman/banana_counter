import { Navigate } from "react-router-dom"
import { useUser } from "../UserContextProvider"
import { useEffect, useState } from "react";

export default function RedirectOnRoot(){

    const {username, setUsername} = useUser()
    const [page, setPage] = useState("");

    useEffect(() => {
        if(username === "") return
       if(username) setPage("/home-page");
       else setPage("/login");
}, [username])

    if(!page) return null
    return (
        <Navigate to={page}/>
    )
}