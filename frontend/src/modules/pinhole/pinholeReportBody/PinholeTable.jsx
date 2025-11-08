import { useContext, useMemo } from "react";
import { HOUR_LIST } from "../PinholeConstantData";
import TableTuple from "./TableTuple";
import usePinholeDataContext from "../contexts/usePinholeDataContext";

const PinholeTable = () => {
  const {
    viewData,
  } = usePinholeDataContext();

  const dataFieldNameList = [
    'Machine', 'Line', 'WorkOrder', 'AQL',
  ];

  return (
    <div className="overflow-auto flex-1 set__scrollbar__invisible">
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-gray-50 sticky top-0 z-5 h-16">
          <tr className="text-left">
            {
              dataFieldNameList.map((dataFieldName, key) => (
                <th key={key} className="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-200">{dataFieldName}</th>
              ))
            }
            {HOUR_LIST.map(hour => (
              <th key={hour}
                className="px-2 py-2 font-semibold border-b border-gray-200 text-center bg-gray-200">
                {hour}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(viewData.rows) && viewData.rows?.map(row =>
            <TableTuple key={`${row.MachineName}-${row.Line}`} row={row} />
          )}

          {(!viewData.rows || viewData.rows.length === 0) && (
            <tr>
              <td
                colSpan={4 + HOUR_LIST.length}
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
};

export default PinholeTable;