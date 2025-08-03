
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import Login from './Login_Page.jsx';
import HomePage from './Home_Page.jsx';
import UserPage from "./User_Page.jsx";
import Header from "../components/Header.jsx";
import {UserContextProvider, useUser} from '../context/UserContextProvider.jsx';
import RedirectOnRoot from './Redirect_On_Root.jsx';
import Search from './Search.jsx';
import FriendRequestPage from './Friend_Request_Page.jsx';
import ChangePassWord from './ChangePasswordPage.jsx';
import CurrentUserPage from './CurrentUserPage.jsx';

export default function App(){
  return (
<Router>  
   <UserContextProvider>
      <Header/>
      <Routes>
        <Route path = "/login" element={<Login />} />
        <Route path = "/home-page" element={<HomePage />} />
        <Route path = "/user/:userUsername"element={<UserPage/>}></Route>
        <Route path = "/search" element={<Search/>}></Route>
        <Route path = "/friend-requests" element={<FriendRequestPage/>}></Route>
        <Route path = "/change-password/:token" element={<ChangePassWord/>}></Route>
        <Route path = "/current-user" element={<CurrentUserPage/>}></Route>
        <Route path = "/" element={<RedirectOnRoot/>}/>
      </Routes>
    </UserContextProvider>
    </Router>
)}
