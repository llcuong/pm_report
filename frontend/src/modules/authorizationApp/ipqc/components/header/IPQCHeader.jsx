import DropdownDataCustom from "@components/DropdownDataCustom";
import DropdownDateCustom from "@components/DropdownDateCustom";
import { useTranslation } from "react-i18next";
import useIPQCSelectOptionContext from "../../contexts/useIPQCSelectOptionContext";
import { FACTORY_DATA } from "@modules/pinhole/PinholeConstantData";

const IPQCHeader = () => {
  const { t } = useTranslation();

  const {
    selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
    machineData, selectedMachine, setSelectedMachine,
    selectedDate, setSelectedDate,

    viewData,

    isPendingUI,
    isFetching,
    isAPIError,
  } = useIPQCSelectOptionContext();

  return (
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-2xl font-bold text-[#1b9eaf]">IPQC Data</h2>
      <div className="shrink-0 flex gap-3">
        <DropdownDateCustom value={selectedDate} onChange={setSelectedDate} />

        <DropdownDataCustom
          options={FACTORY_DATA}
          placeholder={`${t('outlet.pinholeReport.body.factory')}`}
          value={selectedFactory}
          onChange={setSelectedFactory}
          buttonClassName="w-40"
          menuClassName="w-40"
        />

        <DropdownDataCustom
          key={selectedFactory?.value}
          options={branchData}
          placeholder={`${t('outlet.pinholeReport.body.branch')}`}
          value={selectedBranch}
          onChange={setSelectedBranch}
          buttonClassName="w-24"
          menuClassName="w-24"
          disabled={branchData.length === 0}
        />
      </div>
    </div>
  );
};

export default IPQCHeader;