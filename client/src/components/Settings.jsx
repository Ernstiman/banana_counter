import { useEffect, useState } from "react";
import useGetSettings from "../hooks/useGetSettings";
import { postSettings } from "../api/api";
import { useUser } from "../context/UserContextProvider";

export default function Settings(){

    const {username} = useUser();
    const {settings, setSettings} = useGetSettings();
    const [showSettings, setShowSettings] = useState(false);

    async function handleDarkMode(e){
        let newSettings = {...settings, darkMode: false};
        if(e.target.checked){            
            document.documentElement.setAttribute('data-theme', "dark");
            newSettings = {...settings, darkMode: true};
        }
        else{
            document.documentElement.setAttribute('data-theme', "light");
        }
        setSettings(newSettings)
        await postSettings(username, newSettings);
    }

    return (
        <>
        <button className = "settings-button" onClick={() => {setShowSettings(!showSettings)}}>Settings</button>
        {showSettings && <div className="settings-overlay"></div>}
        <div className={`settings-container ${showSettings ? 'show' : ''}`}>
            <div className="settings-row">
                <h5 className="settings-text">Dark Mode</h5>
                <input type="checkbox" checked={settings.darkMode} onChange={(e) => handleDarkMode(e)}/>
            </div>
            <button className="close-settings-button"onClick={() => setShowSettings(false)}>Close</button>
        </div>
        </>
    );
}