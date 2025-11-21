import { HOUR_LIST, HOUR_CLASS_CONFIG } from "../PinholeConstantData";
import TableCell from "./TableCell";
import { Fragment } from "react";

const TableTuple = ({ row }) => {
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
      {HOUR_CLASS_CONFIG.map(cls => (
          <Fragment key={cls.id}>
            {cls.hours.map(hour => (
              <TableCell key={hour} hour={hour} row={row} />
            ))}

            <td
              className="px-3 py-2 border-b border-gray-200 text-center bg-gray-100 font-semibold"
            >
              {row[`${cls.id}_sum`] ?? ""}
            </td>
          </Fragment>
        ))}
    </tr>
  );
};

export default TableTuple;