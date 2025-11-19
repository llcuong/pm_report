import THead from "./THead/THead";
import TBody from "./TBody/TBody";

const DataTable = () => {
  const getStatusColor = (key) => key === 'Active' ? 'green-600' : 'red-600';

  return (
    <div className="relative w-full h-148 border border-gray-400 rounded-lg overflow-x-auto">
      <table className="relative w-full border-collapse rounded-lg overflow-hidden">
        <THead />
        <TBody />
      </table>
    </div>
  );
};

export default DataTable;