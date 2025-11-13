import * as Tooltip from '@radix-ui/react-tooltip';
import getColorClassname from "../utils/getColorClassname";
import { useTranslation } from 'react-i18next';

const TableCell = ({ hour, row }) => {
  const { t } = useTranslation();

  const value = (row[hour] ?? "").toString().trim();
  const colorCode = (row[`${hour}_color`] ?? "").toString().trim();
  const colorClassname = getColorClassname(colorCode);
  const hasWorkOrder = (row[`${hour}_wo`] ?? "").toString().trim() !== "";

  if (!hasWorkOrder) {
    return (
      <td key={hour} className={`px-2 py-1 border-b border-gray-100 text-center tabular-nums ${colorClassname}`}>
        {value}
      </td>
    );
  }

  return (
    <Tooltip.Root key={hour}>
      <Tooltip.Trigger asChild>
        <td className={`px-2 py-1 border-b border-gray-100 text-center tabular-nums cursor-default ${colorClassname}`}>
          {value}
        </td>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-gray-900 text-white px-3 py-1.5 rounded text-xs shadow-lg z-50"
          sideOffset={5}
        >
           <div className="text-left">
            <div className="font-semibold mb-0.5">{hour}:00</div>
            <div>WO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{row[`${hour}_wo`] || ""}</div>
            <div>Standard&nbsp;AQL:&nbsp;&nbsp;&nbsp;&nbsp;{row[`${hour}_aql`] || ""}</div>
            <div>Inspect&nbsp;&nbsp;&nbsp;&nbsp;AQL:&nbsp;&nbsp;&nbsp;&nbsp;{row[`${hour}_qcaql`] || ""}</div>
            <div>---------------------------------</div>
            <div>Place:&nbsp;&nbsp;{row[`${hour}_place`] || ""}</div>
            <div>Item:&nbsp;&nbsp;&nbsp;{row[`${hour}_item`] || ""}</div>
          </div>
          <Tooltip.Arrow className="fill-gray-900" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default TableCell;