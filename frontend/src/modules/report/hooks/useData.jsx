import {useState, useEffect, useRef, useTransition} from "react";
import {format} from "date-fns";
import {buildFetchUrl} from "./pinholeUtils";
import {REFRESH_INTERVAL} from "./pinholeConstants";

export const usePinholeData = (filters) => {
    const [viewData, setViewData] = useState({title: null, rows: []});
    const [isPendingUI, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const reqSeq = useRef(0);

    const {selectedFactory, selectedBranch, selectedDate, selectedAql, setAqlOptions, setSelectedAql} = filters;

    const doFetch = (signal) => {
        const seq = ++reqSeq.current;
        setIsFetching(true);

        const params = {
            factory: selectedFactory?.value,
            branch: selectedBranch?.value,
            date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
            aql: selectedAql?.value,
        };

        const url = buildFetchUrl(params);

        fetch(url, {signal})
            .then((res) => res.json())
            .then((json) => {
                if (seq !== reqSeq.current) return;

                const title = json?.title || "Pinhole Inspection Data";
                const rows = Array.isArray(json?.pinhole_data) ? json.pinhole_data : [];

                const rawAqlList = Array.isArray(json?.aql_list) ? json.aql_list : [];
                const nextAqlOptions = rawAqlList.map(v => {
                    const s = String(v);
                    return {value: s, label: s};
                });

                setAqlOptions(nextAqlOptions);
                if (!selectedAql || !nextAqlOptions.some(o => o.value === selectedAql.value)) {
                    setSelectedAql(nextAqlOptions[0]);
                }

                startTransition(() => setViewData({title, rows}));
            })
            .catch(() => {
                if (seq !== reqSeq.current) return;
                startTransition(() => setViewData((prev) => ({...prev, title: "Server sập rồi !"})));
            })
            .finally(() => {
                if (seq === reqSeq.current) setIsFetching(false);
            });
    };

    useEffect(() => {
        const ac = new AbortController();
        doFetch(ac.signal);

        const timer = setInterval(() => doFetch(ac.signal), REFRESH_INTERVAL);

        return () => {
            ac.abort();
            clearInterval(timer);
        };
    }, [selectedFactory, selectedBranch, selectedDate, selectedAql]);

    return {viewData, isFetching, isPendingUI};
};