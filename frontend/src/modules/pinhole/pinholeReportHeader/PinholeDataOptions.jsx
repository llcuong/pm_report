import DropdownDataCustom from "@components/DropdownDataCustom";
import DropdownDateCustom from "@components/DropdownDateCustom";
import PinholeResizeButton from "./PinholeResizeButton";
import usePinholeDataContext from "../contexts/usePinholeDataContext";
import { FACTORY_DATA } from "../PinholeConstantData";
import { useTranslation } from "react-i18next";

const PinholeDataOptions = () => {
  const {
    aqlData, selectedAql, setSelectedAql,
    selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
    selectedDate, setSelectedDate,
  } = usePinholeDataContext();

  const { t } = useTranslation();

  return (
    <div className="shrink-0 flex gap-3">
      <DropdownDataCustom
        key={"aql"}
        options={aqlData}
        placeholder={`${t('outlet.pinholeReport.body.aql')}`}
        value={selectedAql}
        onChange={setSelectedAql}
        buttonClassName="w-22"
        menuClassName="w-22"
        disabled={!aqlData?.length}
      />

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

      <PinholeResizeButton />
    </div>
  );
};

export default PinholeDataOptions;