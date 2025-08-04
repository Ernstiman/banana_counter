import useGetBananaCount from "../hooks/useGetBananaCount"
import "../style/Components/ProfilePageHead.css";

export default function ProfilePageHead({username}){

    const {bananaCount, loadingCount} = useGetBananaCount({username})

    return (
        <header className="profile-header">
            <h1>{username}'s Profile</h1>
            {loadingCount ? (
                <p>Loading...</p>
            ) : (
                <p>Banana Count: {bananaCount}</p>
            )}
        </header>
    )
}