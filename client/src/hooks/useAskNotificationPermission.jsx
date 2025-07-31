import { useEffect } from "react";
import { getPublicVapidKey, postNotificationSubscription } from "../api/api";
import { useUser } from "../context/UserContextProvider";

export default function useAskNotificationPermission(){
    const {username} = useUser()
    async function subscribeUser(){
        const key = await getPublicVapidKey()
        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: key
        })  

        await postNotificationSubscription(subscription, username)
    }

    useEffect(()=> {
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
    }, [])
}