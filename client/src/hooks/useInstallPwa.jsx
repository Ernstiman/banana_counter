import { Children, useEffect, useState } from "react"

export default function InstallPwa({children}){

    const [defferedPrompt, setDefferedPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {

    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDefferedPrompt(e);
      setShowPrompt(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

    const handleInstall = async () => {
        if(defferedPrompt){
            defferedPrompt.prompt();
            setShowPrompt(false)        }
    }

    if(!isMobile) return children;

    return(
        <div className="install-banner">
            <p>Please install our app for a better experience!</p>
            <button onClick={handleInstall}>Install</button>
        </div>
    )


}

