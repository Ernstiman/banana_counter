import { useEffect } from "react";
import { getPublicVapidKey, postNotificationSubscription } from "../api/api";
import { useUser } from "../context/UserContextProvider";
import urlBase64ToUint8Array from "../../public/utils/urlBase64ToUnit8Array";

export default function useAskNotificationPermission(){
    const {username} = useUser()
    async function subscribeUser(){
        const key = await getPublicVapidKey()
        
        const converted_key = urlBase64ToUint8Array(key);
       
        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: converted_key
        })  

        await postNotificationSubscription(subscription, username)
    }

    

    useEffect(()=> {
        if(username){
        if(Notification.permission !== "granted"){
            Notification.requestPermission()
            .then((permission) => {
                if(permission === "granted"){
                    console.log("Notification is allowed! ")
                    subscribeUser()
                }   
            })
        }
        else{
            subscribeUser()
        }
    }
    }, [username])
}