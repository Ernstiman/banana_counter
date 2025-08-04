import { useUser } from "../context/UserContextProvider"
import useGetBananaCount from "../hooks/useGetBananaCount"
import BananaHistory from "../components/Banana_History"
import Followers from "../components/Followers"
import { useMemo } from "react"
import ProfilePageHead from "../components/ProfilePageHead"
import "../style/Routes/CurrentUserPage.css"

export default function CurrentUserPage(){
    const {username, count} = useUser()
    const {loadingCount, bananaCount} = useGetBananaCount({username})
    const users = useMemo(() => {
        return [{username}]
    }, [username])

    return (
        <div className="current-user-page-container">
            <ProfilePageHead username={username} />
            <Followers/>
            <BananaHistory users={users}>Your Banana Activity</BananaHistory>
        </div>
    )
}

