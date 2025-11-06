import React from "react";
import * as Tooltip from '@radix-ui/react-tooltip';
import {getColorClass} from "./pinholeUtils";

export default function PinholeCell({hour, row}) {
    const val = (row[hour] ?? "").toString().trim();
    const c = (row[`${hour}_color`] ?? "").toString().trim();
    const cls = getColorClass(c);

    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <td className={`px-2 py-1 border-b border-gray-100 text-center tabular-nums cursor-default ${cls}`}>
                    {val}
                </td>
            </Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content
                    className="bg-gray-900 text-white px-3 py-1.5 rounded text-xs shadow-lg z-50"
                    sideOffset={5}
                >
                    <div className="text-left">
                        <div className="font-semibold mb-0.5">{hour}:00</div>
                        <div>WO: {row[`${hour}_wo`] || "–"}</div>
                        <div>AQL: {row[`${hour}_aql`] || "–"}</div>
                    </div>
                    <Tooltip.Arrow className="fill-gray-900"/>
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    );
}