
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import Login from './Login.jsx';
import React, { useState } from "react";
import Main from './Main.jsx';

export const userContext = React.createContext();


const App = () => {
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(0);
  return (
  <userContext.Provider value={{username, setUsername, count, setCount }}>
    <Router>
      <Routes>
        <Route path = "/login" element={<Login />} />
        <Route path = "/main" element={<Main />} />
        <Route path = "/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </userContext.Provider>

)}
createRoot(document.getElementById('root')).render(<App />);
