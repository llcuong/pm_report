import React, {useEffect, useMemo, useRef, useState, useTransition} from "react";
import * as Tooltip from '@radix-ui/react-tooltip';
import Bases from "@bases/Bases";
import DropdownCustom from "@bases/components/DropdownCustom";
import DropdownDate from "@bases/components/DropdownDate";
import { format } from "date-fns";

function PinholeContent() {
    const [viewData, setViewData] = useState({title: null, rows: []});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [aqlOptions, setAqlOptions] = useState([]);
    const [selectedAql, setSelectedAql] = useState(undefined);
    const [isFull, setIsFull] = useState(false);

    const factoryOptions = useMemo(
        () => [
            {value: "gd", label: "Giang Dien", description: "PVC - NBR"},
            {value: "lk", label: "Long Khanh", description: "NBR"},
            {value: "lt", label: "Long Thanh", description: "PVC"},
        ],
        []
    );
    const [selectedFactory, setSelectedFactory] = useState(factoryOptions[0]);

    const BRANCH_BY_FACTORY = useMemo(
        () => ({
            gd: [
                {value: "PVC", label: "PVC"},
                {value: "NBR1", label: "NBR1"},
                {value: "NBR2", label: "NBR2"},
                {value: "NBR3", label: "NBR3"},
            ],
            lk: [
                {value: "NBR1", label: "NBR1"},
                {value: "NBR2", label: "NBR2"},
            ],
            lt: [
                {value: "PVC1", label: "PVC1"},
                {value: "PVC2", label: "PVC2"},
            ],
        }),
        []
    );

    const branchOptions = useMemo(() => {
        const key = (selectedFactory?.value || "").toLowerCase();
        return BRANCH_BY_FACTORY[key] || [];
    }, [selectedFactory, BRANCH_BY_FACTORY]);

    const [selectedBranch, setSelectedBranch] = useState(
        () => (BRANCH_BY_FACTORY[factoryOptions[0].value] || [])[0]
    );

    useEffect(() => {
        if (branchOptions.length > 0) setSelectedBranch(branchOptions[0]);
        else setSelectedBranch(undefined);
    }, [branchOptions]);

    const [isPendingUI, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const reqSeq = useRef(0);

    const hourCols = useMemo(() => {
        const a = [];
        for (let h = 6; h <= 23; h++) a.push(h.toString().padStart(2, "0"));
        for (let h = 0; h <= 5; h++) a.push(h.toString().padStart(2, "0"));
        return a;
    }, []);

    const colorClass = (code) => {
        const v = (code || "").toString().trim();
        if (v === "0") return "bg-gray-200 text-[#6b7280]";
        if (v === "11") return "bg-white text-dark";
        if (v === "12") return "bg-green-100 text-green-700";
        if (v === "2") return "bg-rose-100 text-rose-800";
        return "";
    };

    useEffect(() => {
        if (isFull) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isFull]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && isFull) setIsFull(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isFull]);

    const doFetch = (signal) => {
        const seq = ++reqSeq.current;
        setIsFetching(true);

        const params = new URLSearchParams();
        if (selectedFactory?.value) params.set("factory", selectedFactory.value);
        if (selectedBranch?.value) params.set("branch", selectedBranch.value);
        if (selectedDate) params.set("date", format(selectedDate, "yyyy-MM-dd"));
        if (selectedAql?.value) params.set("aql", selectedAql.value);

        const url = `/get/api/pinhole-data/?${params.toString()}`;

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
                startTransition(() => setViewData((prev) => ({...prev, title: "Server sáº­p rá»“i !"})));
            })
            .finally(() => {
                if (seq === reqSeq.current) setIsFetching(false);
            });
    };

    useEffect(() => {
        const ac = new AbortController();
        doFetch(ac.signal);
        return () => ac.abort();
    }, [selectedFactory, selectedBranch, selectedDate, selectedAql]);

    useEffect(() => {
        const ac = new AbortController();
        doFetch(ac.signal);

        const tick = () => doFetch(ac.signal);
        const timer = setInterval(tick, 300000);
        return () => {
            ac.abort();
            clearInterval(timer);
        };
    }, [selectedFactory, selectedBranch, selectedDate, selectedAql]);

    const containerClass = useMemo(() => {
        const base = "rounded-lg border border-gray-200 flex flex-col";
        if (isFull) {
            return `fixed inset-0 z-50 m-0 p-6 ${base} rounded-none bg-white`;
        }
        return `h-[calc(100vh-11rem)] mt-3 ${base}`;
    }, [isFull]);

    return (
        <Tooltip.Provider delayDuration={300} skipDelayDuration={200}>
            <div className="p-6">
                <div className="relative">
                    {(isFetching || isPendingUI) && (
                        <div className="pointer-events-none absolute inset-0 rounded-lg bg-white/30" />
                    )}

                    <div className="flex items-start gap-6">
                        <div className="flex-1 flex flex-col">
                            <h1 className="text-2xl font-bold text-blue-700">
                                Pinhole Inspection Data
                                {viewData?.title && (
                                    <span className="inline-block ml-2 align-baseline text-blue-700">
                                        - {viewData.title}
                                    </span>
                                )}
                            </h1>
                        </div>

                        <div className="shrink-0 flex gap-3">
                            <DropdownCustom
                                key={"aql"}
                                options={aqlOptions}
                                placeholder="AQL"
                                value={selectedAql}
                                onChange={setSelectedAql}
                                buttonClassName="w-22"
                                menuClassName="w-22"
                                disabled={!aqlOptions?.length}
                            />

                            <DropdownDate value={selectedDate} onChange={setSelectedDate} />

                            <DropdownCustom
                                options={factoryOptions}
                                placeholder="Factory"
                                value={selectedFactory}
                                onChange={setSelectedFactory}
                                buttonClassName="w-40"
                                menuClassName="w-40"
                            />

                            <DropdownCustom
                                key={selectedFactory?.value}
                                options={branchOptions}
                                placeholder="Branch"
                                value={selectedBranch}
                                onChange={setSelectedBranch}
                                buttonClassName="w-24"
                                menuClassName="w-24"
                                disabled={branchOptions.length === 0}
                            />

                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    title={isFull ? "Thu nhá» (Esc)" : "PhÃ³ng to"}*/}
                            {/*    onClick={() => setIsFull(v => !v)}*/}
                            {/*    className="w-[47px] h-[47px] flex items-center justify-center border-2 border-gray-200 rounded-lg hover:bg-gray-50"*/}
                            {/*    aria-pressed={isFull}*/}
                            {/*>*/}
                            {/*    {isFull ? (*/}
                            {/*        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">*/}
                            {/*            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />*/}
                            {/*        </svg>*/}
                            {/*    ) : (*/}
                            {/*        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">*/}
                            {/*            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />*/}
                            {/*        </svg>*/}
                            {/*    )}*/}
                            {/*</button>*/}
                        </div>
                    </div>

                    <div className={containerClass}>
                        <div className="overflow-auto flex-1 set__scrollbar__invisible">
                            <table className="w-full table-auto border-collapse text-sm">
                                <thead className="bg-gray-50 sticky top-0 z-5">
                                    <tr className="text-left">
                                        <th className="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-50">Machine</th>
                                        <th className="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-50">Line</th>
                                        <th className="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-50">WorkOrder</th>
                                        <th className="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-50">AQL</th>
                                        {hourCols.map((h) => (
                                            <th key={h}
                                                className="px-2 py-2 font-semibold border-b border-gray-200 text-center bg-gray-50">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewData.rows?.map((r) => (
                                        <tr key={`${r.MachineName}-${r.Line}`} className="odd:bg-white even:bg-gray-50">
                                            <td className="px-3 py-2 border-b border-gray-100 whitespace-nowrap">{r.MachineName}</td>
                                            <td className="px-3 py-2 border-b border-gray-100">{r.Line}</td>
                                            <td className="px-3 py-2 border-b border-gray-100">{r.WorkOrder}</td>
                                            <td className="px-3 py-2 border-b border-gray-100 font-medium">{r.AQL}</td>
                                            {hourCols.map((h) => {
                                                const val = (r[h] ?? "").toString().trim();
                                                const c = (r[`${h}_color`] ?? "").toString().trim();
                                                const cls = colorClass(c);
                                                const hasWorkOrder = (r[`${h}_wo`] ?? "").toString().trim() !== "";

                                                if (!hasWorkOrder) {
                                                    return (
                                                        <td key={h} className={`px-2 py-1 border-b border-gray-100 text-center tabular-nums ${cls}`}>
                                                            {val}
                                                        </td>
                                                    );
                                                }

                                                return (
                                                    <Tooltip.Root key={h}>
                                                        <Tooltip.Trigger asChild>
                                                            <td className={`px-2 py-1 border-b border-gray-100 text-center tabular-nums cursor-default ${cls}`}>
                                                                {val}
                                                            </td>
                                                        </Tooltip.Trigger>
                                                        <Tooltip.Portal>
                                                            <Tooltip.Content
                                                                className="bg-gray-900 text-white px-3 py-1.5 rounded text-xs shadow-lg z-50"
                                                                sideOffset={5}
                                                            >
                                                                <div className="text-left">
                                                                    <div className="font-semibold mb-0.5">{h}:00</div>
                                                                    <div>WO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{r[`${h}_wo`] || ""}</div>
                                                                    <div>AQL:&nbsp;&nbsp;&nbsp;&nbsp;{r[`${h}_aql`] || ""}</div>
                                                                    <div>---------------------------</div>
                                                                    <div>Place:&nbsp;&nbsp;{r[`${h}_place`] || ""}</div>
                                                                </div>
                                                                <Tooltip.Arrow className="fill-gray-900"/>
                                                            </Tooltip.Content>
                                                        </Tooltip.Portal>
                                                    </Tooltip.Root>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                    {(!viewData.rows || viewData.rows.length === 0) && (
                                        <tr>
                                            <td colSpan={4 + hourCols.length} className="px-3 py-6 text-center text-gray-500">
                                                No data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Tooltip.Provider>
    );
}

export default function PinholeIndex({currentApp, navigateApp}) {
    const navbarLogo = (
        <div className="text-dark text-xl font-bold transition-colors">
            <span>PM REPORT - PINHOLE</span>
        </div>
    );

    return (
        <Bases
            currentApp={currentApp}
            navigateApp={navigateApp}
            navbarLogo={navbarLogo}
            mainContainer={<PinholeContent/>}
        />
    );
}