import { useEffect, useMemo, useState } from "react";
import { BRANCH_BY_FACTORY_DATA, FACTORY_DATA } from "../PinholeConstantData";

export default function useFactoryBranch() {
  const factoryData = FACTORY_DATA;
  const [selectedFactory, setSelectedFactory] = useState(factoryData[0]);

  const [selectedBranch, setSelectedBranch] = useState(() =>
    // Set default factory and relative branch
    (BRANCH_BY_FACTORY_DATA[FACTORY_DATA[0].value] || [])[0]
  );

  // Change relative branches based on selected factory
  const branchData = useMemo(() => {
    let key = (selectedFactory?.value || "").toLowerCase();
    return BRANCH_BY_FACTORY_DATA[key] || [];
  }, [selectedFactory]);

  useEffect(() => {
    if (branchData.length > 0) {
      setSelectedBranch(branchData[0]);
    } else {
      setSelectedBranch(undefined);
    }
  }, [branchData]);

  return {
    factoryData, selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
  };
};