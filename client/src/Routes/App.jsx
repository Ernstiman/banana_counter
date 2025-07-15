
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import Login from './Login_Page.jsx';
import React, { useState } from "react";
import HomePage from './Home_Page.jsx';
import UserPage from "./User_Page.jsx";
import Header from "../Header.jsx";
import {UserContextProvider, useUser} from '../UserContextProvider.jsx';
import RedirectOnRoot from './Redirect_On_Root.jsx';


export default function App(){
  return (
  
<Router>  
   <UserContextProvider>
    
      <Header/>
      <Routes>
        <Route path = "/login" element={<Login />} />
        <Route path = "/home-page" element={<HomePage />} />
        <Route path = "/user/:username" element={<UserPage/>}></Route>
        <Route path = "/" element={<RedirectOnRoot/>}/>
      </Routes>
    </UserContextProvider>
    </Router>
)}
