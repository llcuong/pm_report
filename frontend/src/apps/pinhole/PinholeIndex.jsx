import React from "react";
import Bases from "@bases/bases.jsx";
import PinholeContent from "./index/content";

export default function PinholeIndex({currentApp, navigateApp}) {
    const navbarLogo = (
        <div className="text-dark text-xl font-bold transition-colors">
            <span>PM REPORT - PINHOLE</span>
        </div>
    );

    return (
        <Bases
            currentApp={currentApp}
            navigateApp={navigateApp}
            navbarLogo={navbarLogo}
            mainContainer={<PinholeContent/>}
        />
    );
}