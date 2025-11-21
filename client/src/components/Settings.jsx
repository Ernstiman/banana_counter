import { useEffect, useState } from "react";

export default function Settings(){

    const [darkMode, setDarkMode] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    function handleDarkMode(e){
        setDarkMode(!darkMode);
        if(e.target.checked){            
            document.documentElement.setAttribute('data-theme', "dark");
        }
        else{
            document.documentElement.setAttribute('data-theme', "light");
        }
    }

    return (
        <>
        <button className = "settings-button" onClick={() => {setShowSettings(!showSettings)}}>Settings</button>
        {showSettings && <div className="settings-overlay"></div>}
        <div className={`settings-container ${showSettings ? 'show' : ''}`}>
            <div className="settings-row">
                <h5 className="settings-text">Dark Mode</h5>
                <input type="checkbox" checked={darkMode} onChange={(e) => handleDarkMode(e)}/>
            </div>
            <button className="close-settings-button"onClick={() => setShowSettings(false)}>Close</button>
        </div>
        </>
        
    );
}