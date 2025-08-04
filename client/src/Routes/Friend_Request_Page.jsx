import ListFriendRequests from "../components/List_Friend_Requests";
import "../style/Routes/FriendRequestPage.css"; // Assuming you have a CSS file for styles

export default function FriendRequestPage(){

    return (
        <div className="friend-request-page-container">
            <ListFriendRequests/>
        </div>
    )
}