import { useContext, useEffect, useState } from "react";
import { getSettings } from "../api/api";
import { useUser } from "../context/UserContextProvider";

export default function useGetSettings(){
    const {username} = useUser();
    const [settings, setSettings] = useState({darkMode: false});
    const [loadingSettings, setLoadingSettings] = useState(true);

    useEffect(() => {
        setLoadingSettings(true);
        if(!username){
            setLoadingSettings(false);
        }
        else{
            getSettings(username).then((data) => {
                setSettings(data);
            }).catch(err => {
                console.log(err.message);
            }).finally(() => setLoadingSettings(false));

        }
    }, [username]);

    return {settings, setSettings, loadingSettings};
}