export const FACTORY_OPTIONS = [
    {value: "gd", label: "Giang Dien", description: "PVC - NBR"},
    {value: "lk", label: "Long Khanh", description: "NBR"},
    {value: "lt", label: "Long Thanh", description: "PVC"},
];

export const BRANCH_BY_FACTORY = {
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
};

export const HOUR_COLUMNS = (() => {
    const hours = [];
    for (let h = 6; h <= 23; h++) hours.push(h.toString().padStart(2, "0"));
    for (let h = 0; h <= 5; h++) hours.push(h.toString().padStart(2, "0"));
    return hours;
})();

export const REFRESH_INTERVAL = 300000;