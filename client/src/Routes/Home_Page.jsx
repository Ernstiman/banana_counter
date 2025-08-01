
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


export default function HomePage() {
    console.log("hejhejhej")
    const {username, following} = useUser();
    const [addedCount, setAddedCount] = useState(0);
    useRegisterServiceWorker()
    useAskNotificationPermission()

    return (
        <div className="app-container">
            <div className="user-data-container">
                <BananaCount />
                <div className="change-count-container">
                    <div className="banana-buttons-group">
                        <AddBananaButton addedCount={addedCount} setAddedCount={setAddedCount}/>
                        <div className="added-bananas-text">
                            {addedCount !== 0 && (
                                <h2>{addedCount} added bananas</h2>
                            )}
                        </div>
                        <SubtractBananaButton addedCount={addedCount} setAddedCount={setAddedCount}/>
                        <SubmitBananasButton addedCount={addedCount} setAddedCount={setAddedCount}/>
                    </div>
                </div>
            </div>
            
            <Followers/>
            <BananaHistory users={following}>Banana Activity: </BananaHistory>  
        </div>
    )
}