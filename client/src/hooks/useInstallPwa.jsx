import { Children, useEffect, useState } from "react"

export default function InstallPwa({children}){

    const [defferedPrompt, setDefferedPrompt] = useState("");
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDefferedPrompt(e);
            setShowPrompt(false);
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

        return () => {window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)}

    }, [])

    const handleInstall = async () => {
        if(defferedPrompt){
            defferedPrompt.prompt();
            setShowPrompt(false)
        }
    }

    if(!showPrompt) return {...children}

    return(
        <div className="install-banner">
            <p>Please install our app for a better experience!</p>
            <button onClick={handleInstall}>Install</button>
        </div>
    )


}

