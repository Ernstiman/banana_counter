
import { useUser } from "../context/UserContextProvider"
import { UserNav } from "./Navs";
import useGetUserFollowers from "../hooks/useGetUserFollowers";
import { NormalLoader } from "./Loaders";


export default function Followers() {
    const { followers, following } = useUser();
    const { loadingUserFollowers } = useGetUserFollowers();

    if (loadingUserFollowers) {
        return (
        <div className="followers-root-container">
            <NormalLoader />
        </div>)
    }
    return (
        <div className="followers-root-container">
            <div className="followed-container">
                <h2>Following</h2>
                <ul className="followed-list scroll-list">
                    {following && following.map(user => (
                        <li key={user.username} className="follow-list-item">
                            <UserNav targetUsername={user.username} />
                            <span className="follow-count">🍌 {user.count}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="followers-container">
                <h2>Followers</h2>
                <ul className="followers-list scroll-list">
                    {followers && followers.map(user => (
                        <li key={user.username} className="follow-list-item">
                            <UserNav targetUsername={user.username} />
                            <span className="follow-count">🍌 {user.count}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
