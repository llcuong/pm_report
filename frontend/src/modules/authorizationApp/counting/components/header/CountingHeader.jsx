import DropdownDataCustom from "@components/DropdownDataCustom";
import DropdownDateCustom from "@components/DropdownDateCustom";
import useCountingSelectOptionContext from "../contexts/useCountingSelectOptionContext";

import { FACTORY_DATA } from "@modules/pinhole/PinholeConstantData";

import { useTranslation } from "react-i18next";
import { MODE } from "../../CountingConstants";

const CountingHeader = () => {
  const {
    mode, setMode,
    selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
    machineData, selectedMachine, setSelectedMachine,
    selectedDate, setSelectedDate,
  } = useCountingSelectOptionContext();

  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-[#1b9eaf]">{t('sidebar.countingData')}</h2>
      <div className="shrink-0 flex gap-3">
        <DropdownDataCustom
          options={MODE}
          placeholder={`${t('selectOption.selectMode')}`}
          value={mode}
          onChange={setMode}
          buttonClassName="w-35"
          menuClassName="w-35"
        />

        <DropdownDateCustom value={selectedDate} onChange={setSelectedDate} />

        <DropdownDataCustom
          options={FACTORY_DATA}
          placeholder={`${t('selectOption.selectFactory')}`}
          value={selectedFactory}
          onChange={setSelectedFactory}
          buttonClassName="w-40"
          menuClassName="w-40"
        />

        <DropdownDataCustom
          options={branchData}
          placeholder={`${t('selectOption.selectBranch')}`}
          value={selectedBranch}
          onChange={setSelectedBranch}
          buttonClassName="w-40"
          menuClassName="w-40"
          disabled={branchData.length === 0}
        />

        {
          mode && mode.id === 2 && (
            <DropdownDataCustom
              options={machineData}
              placeholder={`${t('selectOption.selectMachine')}`}
              value={selectedMachine}
              onChange={setSelectedMachine}
              buttonClassName="w-50"
              menuClassName="w-50"
              disabled={mode.id === 1 || machineData.length === 0}
            />
          )
        }
      </div>
    </div>
  );
};

export default CountingHeader;