
import { useUser } from "../context/UserContextProvider"
import { UserNav } from "./Navs";
import useGetUserFollowers from "../hooks/useGetUserFollowers";
import { NormalLoader } from "./Loaders";
import "../style/Components/Followers.css"; 
import { useEffect } from "react";


export default function Followers() {
    const { followers, following } = useUser();
    const { loadingUserFollowers } = useGetUserFollowers();
    const [sortedFollowers, setSortedFollowers] = useState([]);
    const [sortedFollowing, setSortedFollowing] = useState([]);
    const [loadingSorting, setLoadingSorting] = useState(true);

    useEffect(() => {
        setSortedFollowers(followers.sort((a, b) => b.count - a.count));
        setSortedFollowing(following.sort((a, b) => b.count - a.count));
        setLoadingSorting(false);
    }, [followers, following]);

    if (loadingUserFollowers || loadingSorting) {
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
                    {sortedFollowing && sortedFollowing.map((user, i) => (
                        <li key={i} className="follow-list-item">
                            <UserNav targetUsername={user.username} />
                            <span className="follow-count">🍌 {user.count}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="followers-container">
                <h2>Followers</h2>
                <ul className="followers-list scroll-list">
                    {sortedFollowers && sortedFollowers.map((user, i) => (
                        <li key={i} className="follow-list-item">
                            <UserNav targetUsername={user.username} />
                            <span className="follow-count">🍌 {user.count}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
