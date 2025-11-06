import React, { useMemo } from "react";
import * as Tooltip from '@radix-ui/react-tooltip';
import PinholeHeader from "./header.jsx";
import PinholeTable from "./table.jsx";
import { usePinholeFilters } from "./useFilters.js";
import { usePinholeData } from "./useData.js";
import { useFullscreen } from "../hooks/useFullScreen.jsx";

export default function PinholeContent() {
    const filters = usePinholeFilters();
    const { viewData, isFetching, isPendingUI } = usePinholeData(filters);
    const [isFull, setIsFull] = useFullscreen();

    const containerClass = useMemo(() => {
        const base = "rounded-lg border border-gray-200 flex flex-col";
        if (isFull) {
            return `fixed inset-0 z-50 m-0 ml-18 p-6 ${base} rounded-none bg-white`;
        }
        return `h-[calc(100vh-11rem)] mt-3 ${base}`;
    }, [isFull]);

    if (!viewData) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-[calc(100vh-11rem)]">
                    <div className="text-gray-500">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <Tooltip.Provider delayDuration={300} skipDelayDuration={200}>
            <div className="p-6">
                <div className="relative">
                    {(isFetching || isPendingUI) && (
                        <div className="pointer-events-none absolute inset-0 rounded-lg bg-white/30" />
                    )}

                    <PinholeHeader
                        title={viewData?.title || ''}
                        aqlOptions={filters.aqlOptions}
                        selectedAql={filters.selectedAql}
                        setSelectedAql={filters.setSelectedAql}
                        selectedDate={filters.selectedDate}
                        setSelectedDate={filters.setSelectedDate}
                        selectedFactory={filters.selectedFactory}
                        setSelectedFactory={filters.setSelectedFactory}
                        branchOptions={filters.branchOptions}
                        selectedBranch={filters.selectedBranch}
                        setSelectedBranch={filters.setSelectedBranch}
                        isFull={isFull}
                        setIsFull={setIsFull}
                    />

                    <div className={containerClass}>
                        <PinholeTable rows={viewData?.rows || []} />
                    </div>
                </div>
            </div>
        </Tooltip.Provider>
    );
}