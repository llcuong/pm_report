import React, {useCallback, useEffect, useState} from "react"
import SidebarOpenButton from "./components/sidebar/SidebarOpenButton.jsx"
import SidebarHeader from "./components/sidebar/SidebarHeader.jsx"
import SidebarBody from "./components/sidebar/SidebarBody.jsx"
import SidebarFooter from "./components/sidebar/SidebarFooter.jsx"

const LEFT_SIDEBAR_STATE_KEY = "__sidebar_state__"

export default function LeftSidebar(props) {
    const [isOpen, setIsOpen] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(LEFT_SIDEBAR_STATE_KEY) ?? "false")
        } catch {
            return false
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(LEFT_SIDEBAR_STATE_KEY, JSON.stringify(isOpen))
        } catch {
        }
    }, [isOpen])

    const toggleSidebar = useCallback(() => setIsOpen(v => !v), [])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Tab") {
                e.preventDefault()
                toggleSidebar()
            }
        }
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [toggleSidebar])

    return (
        <>
            <aside
                className={[
                    "bg-[var(--bg-primary)] border border-gray-200 fixed left-2 top-[4.5rem] bottom-2 rounded-lg shadow-lg z-[82] flex flex-col py-2",
                    "transition-[width,transform] duration-300 ease-out",
                    isOpen ? "w-60 items-start pl-0" : "w-16 items-center pl-0"
                ].join(" ")}
            >
                <SidebarOpenButton onToggle={toggleSidebar} isExpanded={isOpen}/>
                <SidebarHeader/>
                <SidebarBody
                    currentApp={props.currentApp}
                    navigateApp={props.navigateApp}
                    isExpanded={isOpen}
                />
                <SidebarFooter/>
            </aside>

            <div
                className={[
                    "fixed inset-0 bg-black/50 z-[81] transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 invisible pointer-events-none"
                ].join(" ")}
            />
        </>
    )
}
