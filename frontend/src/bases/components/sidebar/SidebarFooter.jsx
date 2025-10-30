import React from "react";

export default function SidebarFooter({onLogout}) {
    return (
        <div className="h-12 w-full flex flex-col items-center justify-center">
            <div className="w-10 h-[2px] bg-gray-200 rounded"/>
            <div className="h-10">
                <button
                    onClick={onLogout}
                    className="mt-2 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-100 text-red-600 transition-all duration-200"
                    title="Logout"
                >
                    ⎋
                </button>
            </div>
        </div>
    );
}
