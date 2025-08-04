
import { useUser } from "../context/UserContextProvider.jsx";
import { useEffect, useState } from "react";
import FindUsers from "../components/Find_Users.jsx";
import Followers from "../components/Followers.jsx";
import useBananaCount from "../hooks/useGetBananaCount.jsx";
import BananaHistory from "../components/Banana_History.jsx";
import ListFriendRequests from "../components/List_Friend_Requests.jsx";
import { AddBananaButton, SubtractBananaButton, SubmitBananasButton } from "../components/Buttons.jsx";
import BananaCount from "../components/Banana_Count.jsx";
import useGetBananaCount from "../hooks/useGetBananaCount.jsx";
import useRegisterServiceWorker from "../hooks/useRegisterServiceWorker.jsx";
import useAskNotificationPermission from "../hooks/useAskNotificationPermission.jsx";
import SubmitBananas from "../components/SubmitBananas.jsx";
import useGetUserFollowers from "../hooks/useGetUserFollowers.jsx";


export default function HomePage() {
    const {username, following} = useUser();
    const [submit, setSubmit] = useState(false);

    const {loadingUserFollowers} = useGetUserFollowers()
    useRegisterServiceWorker()
    useEffect(() => {
        try {
            if(Notification.permission === "default"){
                Notification.requestPermission();
            }
        } catch (error) {
            console.error("Error requesting notification permission:", error);
        }
    }, [])

    return (
        <div className="app-container">
            <div className="user-data-container">
                <BananaCount />
            </div>
            <BananaHistory users={following}>Banana Activity: </BananaHistory>  
            {!submit && (<span className="post-banan-activity" onClick={ () => setSubmit(true)}>Post Banana Activity</span>)}
            <div className="submit-bananas-container">
                {submit && (<SubmitBananas setSubmit={setSubmit}/>)}
            </div>

            
        </div>
    )
}