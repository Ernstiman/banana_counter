import { useEffect } from "react";
import { getPublicVapidKey, postNotificationSubscription } from "../api/api";
import { useUser } from "../context/UserContextProvider";

export default function useAskNotificationPermission(){
    const {username} = useUser()
    async function subscribeUser(){
        const key = await getPublicVapidKey()
        console.log(key,"key")
        const converted_key = urlBase64ToUint8Array(key);
        console.log(converted_key, "converted_key")
        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: converted_key
        })  

        console.log(subscription, "subscription");
        console.log(subscription.toJSON().keys, "keys")
        await postNotificationSubscription(subscription, username)
    }

    function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
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