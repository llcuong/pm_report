import { useContext, useMemo } from "react";
import { HOUR_LIST, HOUR_CLASS_CONFIG } from "../PinholeConstantData";
import TableTuple from "./TableTuple";
import usePinholeDataContext from "../contexts/usePinholeDataContext";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";

const PinholeTable = () => {
  const {
    viewData,
  } = usePinholeDataContext();

  const { t } = useTranslation();

  const dataFieldNameList = [
    'machine', 'line', 'workOrder', 'aql',
  ];

  return (
    <div className="overflow-auto flex-1 set__scrollbar__invisible">
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-gray-50 sticky top-0 z-5 h-16">
          <tr className="text-left">
            {
              dataFieldNameList.map((dataFieldName, key) => (
                <th key={key} className="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-200">
                  {t(`outlet.pinholeReport.body.${dataFieldName}`)}
                </th>
              ))
            }
            {HOUR_CLASS_CONFIG.map(cls => (
              <Fragment key={cls.id}>
                {cls.hours.map(hour => (
                  <th
                    key={hour}
                    className="px-2 py-2 font-semibold border-b border-gray-200 text-center bg-gray-200"
                  >
                    {hour}
                  </th>
                ))}

                <th
                  key={`${cls.id}_sum`}
                  className="px-3 py-2 font-semibold border-b border-gray-200 text-center bg-gray-300"
                >
                  {cls.id === "class_1" && <>早班<br/>總計</>}
                  {cls.id === "class_2" && <>中班<br/>總計</>}
                  {cls.id === "class_3" && <>晚班<br/>總計</>}
                </th>
              </Fragment>
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
                colSpan={4 + HOUR_LIST.length + 3}
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