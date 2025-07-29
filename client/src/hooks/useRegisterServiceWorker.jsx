import { useEffect } from "react";

export default function useRegisterServiceWorker(){

    useEffect(() => {
        if("serviceWorker" in navigator && "PushManager" in window){
            navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => console.log("Service worker has been registered!: ", registration))
            .catch((err => console.log("Service worker registration failed", err)))
        }
    }, [])
}