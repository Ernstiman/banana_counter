import { useEffect, useState } from "react";
import urlBase64ToUint8Array from "../../public/utils/urlBase64ToUnit8Array";
import { postNotificationSubscription, removeNotificationSubscription, getPublicVapidKey } from "../api/api";
import { useUser } from "../context/UserContextProvider";
import "../style/Components/NotificationToggle.css";

export default function NotificationToggle(){

    const [notifications, setNotifications] = useState(false)
    const {username} = useUser();

    useEffect(()=>{
        navigator.serviceWorker.ready
        .then(registration => {
            registration.pushManager.getSubscription()
            .then(sub => setNotifications(!!sub))
        })
    }, [])

    async function click(){
        
        const registration = await navigator.serviceWorker.ready;
        let subscription = await registration.pushManager.getSubscription()
        if(subscription){
            await subscription.unsubscribe();
            await removeNotificationSubscription(subscription.endpoint)
            console.log("subscription of! ")
            setNotifications(false)
            }
        else{

            if(Notification.permission !== "granted"){
               await Notification.requestPermission();
                if(Notification.permission !== "granted"){
                    console.log("user has disabled notifications")
                    return 
                }
            }
            const key = await getPublicVapidKey();

            const converted_key = urlBase64ToUint8Array(key)

            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true, 
                applicationServerKey: converted_key
            });
            await postNotificationSubscription(subscription, username)
            console.log("subscription on!")
            setNotifications(true)
    }}
    return (
        <span className="notification-checkbox" onClick={click}>{
            notifications ?
            <img src="/img/notification-on.png" alt="notification-on" className="notification-img-icon" />
            :
            <img src="/img/notification-off.png" alt="notification-off" className="notification-img-icon " />
        }</span>
    )


}