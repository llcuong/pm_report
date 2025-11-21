import IPQCTBody from "./TBody/IPQCTBody";
import IPQCTHead from "./THead/IPQCTHead";

const MainIPQCTable = () => {
  return (
    <div className="w-full overflow-auto border rounded-lg max-h-170">
      <table className="border-collapse w-full min-w-max">
        <IPQCTHead />
        <IPQCTBody />
      </table>
    </div>
  );
};

export default MainIPQCTable;