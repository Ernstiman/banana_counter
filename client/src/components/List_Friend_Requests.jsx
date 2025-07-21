
import { useUser } from "../context/UserContextProvider";
import useGetFriendRequests from "../hooks/useGetFriendRequests";
import FriendRequest from "./Friend_Request";

export default function ListFriendRequests() {
    const { username } = useUser();
    const { friendRequests, loadingFriendRequests, setFriendRequests } = useGetFriendRequests(username);

    if (loadingFriendRequests) {
        return <div className="friend-requests-list loading">Loading friend requests...</div>;
    }
    return (
        <div className="friend-requests-list">
            {friendRequests.length > 0 ? (
                friendRequests.map((username, i) => (
                    <FriendRequest key={i} sender={username} setFriendRequests={setFriendRequests} />
                ))
            ) : (
                <div className="no-friend-requests">No friend requests</div>
            )}
        </div>
    );
}