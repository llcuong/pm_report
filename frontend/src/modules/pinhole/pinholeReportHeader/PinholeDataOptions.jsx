import DropdownDataCustom from "@components/DropdownDataCustom";
import DropdownDateCustom from "@components/DropdownDateCustom";
import PinholeResizeButton from "./PinholeResizeButton";
import usePinholeDataContext from "../contexts/usePinholeDataContext";

const PinholeDataOptions = () => {
  const {
    aqlData, selectedAql, setSelectedAql,
    factoryData, selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
    selectedDate, setSelectedDate,
  } = usePinholeDataContext();

  return (
    <div className="shrink-0 flex gap-3">
      <DropdownDataCustom
        key={"aql"}
        options={aqlData}
        placeholder="AQL"
        value={selectedAql}
        onChange={setSelectedAql}
        buttonClassName="w-22"
        menuClassName="w-22"
        disabled={!aqlData?.length}
      />

      <DropdownDateCustom value={selectedDate} onChange={setSelectedDate} />

      <DropdownDataCustom
        options={factoryData}
        placeholder="Factory"
        value={selectedFactory}
        onChange={setSelectedFactory}
        buttonClassName="w-40"
        menuClassName="w-40"
      />

      <DropdownDataCustom
        key={selectedFactory?.value}
        options={branchData}
        placeholder="Branch"
        value={selectedBranch}
        onChange={setSelectedBranch}
        buttonClassName="w-24"
        menuClassName="w-24"
        disabled={branchData.length === 0}
      />

      <PinholeResizeButton />
    </div>
  );
};

export default PinholeDataOptions;