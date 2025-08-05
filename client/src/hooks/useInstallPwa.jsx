import { Children, useEffect, useState } from "react"

export default function InstallPwa({children}){

    const [deferredPrompt, setDeferredPrompt] = useState(null);
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
      setDeferredPrompt(e);

      setShowPrompt(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

    const handleInstall = async () => {
      console.log(deferredPrompt)
        if(deferredPrompt){
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            console.log("Prompt shown");
        }
    }

    if(!isMobile || isInstalled) return children;

    if(isMobile && deferredPrompt === null) {
        return (
            <div className="install-banner">
                <p>To use banana counter on your phone you need to use your app!</p>
            </div>
        )
    }

    return(
        <div className="install-banner">
            <p>Please install our app for a better experience!</p>
            <button onClick={handleInstall}>Install</button>
        </div>
    )


}

