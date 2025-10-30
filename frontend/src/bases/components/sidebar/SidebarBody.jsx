import React from "react"
import { PinholeIcon } from "@assets/icons/pinhole-icon"
function SidebarBodyBottom({currentApp}) {
    return (
        <></>
    )
}

function SidebarBodyTop(props) {
    const apps = [
        {id: "pinhole", name: "Pinhole", icon: PinholeIcon },
    ]

    return (
        <div className="flex-1 min-h-0 overflow-hidden px-1.5 pt-2 space-y-1">
            {apps.map(app => {
                const Icon = app.icon
                const active = props.currentApp === app.id
                return (
                    <button
                        key={app.id}
                        onClick={() => props.navigateApp?.(app.id)}
                        className={[
                            "w-full h-[2.6rem] rounded-lg flex items-center transition-colors",
                            active
                                ? "bg-blue-600 text-white"
                                : "text-gray-800 hover:text-blue-600 hover:bg-blue-100"
                        ].join(" ")}
                    >
                        <div className="ml-[13px]"><Icon/></div>
                        {props.isExpanded && (
                            <span className="font-medium overflow-hidden whitespace-nowrap ml-[1.25rem]">
                                {app.name}
                          </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}


export default function SidebarBody(props) {
    return (
        <div className="flex-1 w-full flex flex-col">
            <SidebarBodyTop
                currentApp={props.currentApp}
                navigateApp={props.navigateApp}
                isExpanded={props.isExpanded}
            />

            {props.currentApp ? (
                <SidebarBodyBottom currentApp={props.currentApp}/>
            ) : null}
        </div>
    )
}
