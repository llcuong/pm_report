import React from "react"
import Navbar from "./Navbar.jsx"
import LeftSidebar from "./Sidebar.jsx"

export default function Bases(props) {
    return (
        <div>
            <Navbar
                navbarLogo={props.navbarLogo}
                navbarLeft={props.navbarLeft}
                navbarCenter={props.navbarCenter}
                navbarRight={props.navbarRight}
            />

            <LeftSidebar
                currentApp={props.currentApp}
                navigateApp={props.navigateApp}
                onLogout={props.onLogout}
            />

            <main className="relative h-[calc(100vh-4rem)] ml-[76px] mr-[12px]">
                {props.mainContainer}
            </main>
        </div>
    )
}