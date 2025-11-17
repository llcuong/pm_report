import DataTableProvider from "./contexts/DataTableContext";
import THead from "./THead/THead";
import TBody from "./TBody/TBody";

const DataTable = () => {
  const getStatusColor = (key) => key === 'Active' ? 'green-600' : 'red-600';

  return (
    <div className="relative my-1 overflow-x-auto">
      <DataTableProvider>
        <table className="w-full border-collapse rounded-t-lg overflow-hidden">
          <THead />
          <TBody />
        </table>
      </DataTableProvider>
    </div>
  );
};

export default DataTable;