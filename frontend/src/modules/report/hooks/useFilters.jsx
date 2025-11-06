import {useState, useMemo, useEffect} from "react";
import {FACTORY_OPTIONS, BRANCH_BY_FACTORY} from "./pinholeConstants";

export const usePinholeFilters = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedFactory, setSelectedFactory] = useState(FACTORY_OPTIONS[0]);
    const [selectedAql, setSelectedAql] = useState(undefined);
    const [aqlOptions, setAqlOptions] = useState([]);

    const branchOptions = useMemo(() => {
        const key = (selectedFactory?.value || "").toLowerCase();
        return BRANCH_BY_FACTORY[key] || [];
    }, [selectedFactory]);

    const [selectedBranch, setSelectedBranch] = useState(
        () => (BRANCH_BY_FACTORY[FACTORY_OPTIONS[0].value] || [])[0]
    );

    useEffect(() => {
        if (branchOptions.length > 0) setSelectedBranch(branchOptions[0]);
        else setSelectedBranch(undefined);
    }, [branchOptions]);

    return {
        selectedDate,
        setSelectedDate,
        selectedFactory,
        setSelectedFactory,
        selectedBranch,
        setSelectedBranch,
        selectedAql,
        setSelectedAql,
        aqlOptions,
        setAqlOptions,
        branchOptions,
    };
};