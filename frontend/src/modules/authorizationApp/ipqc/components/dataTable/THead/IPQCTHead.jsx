import MenuHeadSeparated from "./MenuHeadSeparated";

const IPQCTHead = () => {
  const machine = [
    'Machine_01', 'Machine_02', 'Machine_03', 'Machine_04', 'Machine_05',
    'Machine_01', 'Machine_02', 'Machine_03', 'Machine_04', 'Machine_05',
    'Machine_01', 'Machine_02', 'Machine_03', 'Machine_04', 'Machine_05',
  ];

  return (
    <thead className="relative">
      <tr className="border-b bg-gray-200">
        <th className="w-25">
          <MenuHeadSeparated />
        </th>
        {machine.map((machine, idx) => (
          <th key={idx}>{machine}</th>
        ))}
      </tr>
    </thead>
  );
};

export default IPQCTHead;