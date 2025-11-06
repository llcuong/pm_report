import React from "react"

export default function Navbar(props) {
    return (
        <nav
            className="bg-[var(--bg-primary)] shadow-[0_10px_5px_-3px_var(--navbar-shadow-color),0_4px_6px_-2px_var(--navbar-shadow-color)] sticky top-0 z-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-8">
                <div className="flex items-center h-16">

                    <div className="flex items-center flex-1 min-w-0">
                        <div className="flex items-center flex-shrink-0">
                            {props.navbarLogo || (
                                <div
                                    className="text-dark text-xl font-bold transition-colors">
                                    <span>PM REPORT</span>
                                </div>
                            )}
                        </div>

                        <div className="ml-8 flex-shrink-0">
                            {props.navbarLeft}
                        </div>
                    </div>

                    <div className="flex flex-row items-center flex-none mx-4 min-w-0">
                        {props.navbarCenter}
                    </div>

                    <div className="flex items-center justify-end gap-1 flex-1 min-w-0">
                        {props.navbarRight}

                        <span className="text-[var(--text-secondary)] px-3 py-2 text-sm font-medium transition-colors">
                             version 0.1
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    )
}
