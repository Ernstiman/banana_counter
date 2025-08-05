import { Children, useEffect, useState } from "react"

export default function InstallPwa({children}){

    const [defferedPrompt, setDefferedPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    useEffect(() => {

    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    if(window.matchMedia("(display-mode: standalone)").matches){
        setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      console.log("Before install prompt event fired");
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
      console.log(defferedPrompt)
        if(defferedPrompt){
            defferedPrompt.prompt();
            await defferedPrompt.userChoice;
            console.log("Prompt shown");
        }
    }

    if(!isMobile || isInstalled) return children;

    return(
        <div className="install-banner">
            <p>Please install our app for a better experience!</p>
            <button onClick={handleInstall}>Install</button>
        </div>
    )


}

