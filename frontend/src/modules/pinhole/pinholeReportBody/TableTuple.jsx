import { HOUR_LIST } from "../PinholeConstantData";
import TableCell from "./TableCell";

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
      {HOUR_LIST.map(hour => (
        <TableCell key={hour} hour={hour} row={row} />
      ))}
    </tr>
  );
};

export default TableTuple;