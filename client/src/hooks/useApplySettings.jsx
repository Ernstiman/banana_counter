import { useEffect } from "react";
import useGetSettings from "./useGetSettings"
import { useUser } from "../context/UserContextProvider";

export default function useApplySettings(){
    const {username} = useUser()
    const {settings, loadingSettings} = useGetSettings();

    useEffect(() => {
        
        if (!loadingSettings) {
            document.documentElement.setAttribute('data-theme', settings.darkMode ? "dark" : "light");
        }
    }, [loadingSettings]);

}