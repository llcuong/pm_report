import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import PinholeIndex from "@apps/pinhole/PinholeIndex";
import LoginPage from "@apps/login/UserLogin";
import "./styles.css";
import "@modules/locales/i18n";

const CURRENT_APP_KEY = "__current_app__";

function Main() {
    const getInitApp = () =>
        (history.state && history.state.app) ||
        localStorage.getItem(CURRENT_APP_KEY) ||
        "pinhole";

    const [currentApp, setCurrentApp] = useState(getInitApp);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigateApp = (appId) => {
        setCurrentApp(appId);
        history.pushState({app: appId}, "", "/");
    };

    useEffect(() => {
        const onPop = (e) =>
            setCurrentApp((e.state && e.state.app) || "pinhole");
        window.addEventListener("popstate", onPop);

        if (!history.state || !history.state.app) {
            history.replaceState({app: currentApp}, "", "/");
        }
        return () => window.removeEventListener("popstate", onPop);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(CURRENT_APP_KEY, currentApp);
        } catch {
        }
    }, [currentApp]);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("__current_app__");
        localStorage.removeItem("token");
    };


    const renderApp = () => {
        if (!isAuthenticated) {
            return <LoginPage onLoginSuccess={handleLoginSuccess}/>;
        }

        switch (currentApp) {
            case "pinhole":
                return (
                    <PinholeIndex currentApp={currentApp} navigateApp={navigateApp} onLogout={handleLogout}/>
                );
            default:
                return (
                    <PinholeIndex currentApp={currentApp} navigateApp={navigateApp} onLogout={handleLogout}/>
                );
        }
    };

    return renderApp();
}

createRoot(document.getElementById("root")).render(<Main/>);
