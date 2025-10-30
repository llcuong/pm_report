import React from "react";
import PinholeCell from "./tableCell";
import {HOUR_COLUMNS} from "./pinholeConstants";

export default function PinholeTableRow({row}) {
    return (
        <tr className="odd:bg-white even:bg-gray-50">
            <td className="px-3 py-2 border-b border-gray-100 whitespace-nowrap">
                {row.MachineName}
            </td>
            <td className="px-3 py-2 border-b border-gray-100">
                {row.Line}
            </td>
            <td className="px-3 py-2 border-b border-gray-100">
                {row.WorkOrder}
            </td>
            <td className="px-3 py-2 border-b border-gray-100 font-medium">
                {row.AQL}
            </td>
            {HOUR_COLUMNS.map((h) => (
                <PinholeCell key={h} hour={h} row={row}/>
            ))}
        </tr>
    );
}