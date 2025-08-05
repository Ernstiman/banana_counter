import { Children, useEffect, useState } from "react"

export default function InstallPwa({children}){

    const [isMobile, setIsMobile] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    useEffect(() => {

    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    if(window.matchMedia("(display-mode: standalone)").matches){
        setIsInstalled(true);
    }
  }, []);

    if(!isMobile || isInstalled) return children;

    return(
        <div className="install-banner">
            <p>To use the banana counter on mobile you need to download the app! </p>
            <p>To download the app tap <strong>SHARE</strong> and then <strong>Add to Home Screen</strong>.</p>
        </div>
    )


}

