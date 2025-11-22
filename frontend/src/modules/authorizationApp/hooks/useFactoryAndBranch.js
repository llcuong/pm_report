
import { BRANCH_BY_FACTORY_DATA, FACTORY_DATA } from "@modules/pinhole/PinholeConstantData";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useFactoryAndBranch = () => {
  const [searchParamFactory] = useSearchParams();

  const [selectedFactory, setSelectedFactory] = useState(() =>
    FACTORY_DATA.find(factory => factory.value === searchParamFactory.get('factory')) || null
  );

  // Change relative branches based on selected factory
  const branchData = useMemo(() => {
    let key = (selectedFactory?.value || "").toLowerCase();
    return BRANCH_BY_FACTORY_DATA.find(branch => branch.id === key)?.branch || []
  }, [selectedFactory]);

  const [selectedBranch, setSelectedBranch] = useState(branchData[0] || null);

  return {
    selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
  };
};

export default useFactoryAndBranch;