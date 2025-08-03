import { useUser } from "../context/UserContextProvider"
import useGetBananaCount from "../hooks/useGetBananaCount"
import BananaHistory from "../components/Banana_History"
import Followers from "../components/Followers"
import { useMemo } from "react"

export default function CurrentUserPage(){
    const {username, count} = useUser()
    const {loadingCount, bananaCount} = useGetBananaCount()
    const users = useMemo(() => {
        return [{username}]
    }, [username])
    return (

        <div className="current-user-page-container">
            <div className="current-user-head-container">
                <h1>{username}</h1>
                {!loadingCount && <h2>Banana count: {count}</h2>}

            </div>
            <Followers/>
            <BananaHistory users={users}>Your Banana Activity</BananaHistory>
        </div>
    )
}

