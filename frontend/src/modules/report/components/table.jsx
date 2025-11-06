import React from "react";
import PinholeTableRow from "./tableRow";
import {HOUR_COLUMNS} from "./pinholeConstants";

export default function PinholeTable({rows}) {
    return (
        <div className="overflow-auto flex-1 set__scrollbar__invisible">
            <table className="w-full table-auto border-collapse text-sm">
                <thead className="bg-gray-50 sticky top-0 z-5">
                <tr className="text-left">
                    <th className="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-50">
                        Machine
                    </th>
                    <th className="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-50">
                        Line
                    </th>
                    <th className="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-50">
                        WorkOrder
                    </th>
                    <th className="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-50">
                        AQL
                    </th>
                    {HOUR_COLUMNS.map((h) => (
                        <th
                            key={h}
                            className="px-2 py-2 font-semibold border-b border-gray-200 text-center bg-gray-50"
                        >
                            {h}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows?.map((r) => (
                    <PinholeTableRow key={`${r.MachineName}-${r.Line}`} row={r}/>
                ))}
                {(!rows || rows.length === 0) && (
                    <tr>
                        <td
                            colSpan={4 + HOUR_COLUMNS.length}
                            className="px-3 py-6 text-center text-gray-500"
                        >
                            No data
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}