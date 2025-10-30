export const getColorClass = (code) => {
    const v = (code || "").toString().trim();
    if (v === "0") return "bg-gray-200 text-[#6b7280]";
    if (v === "11") return "bg-white text-dark";
    if (v === "12") return "bg-green-100 text-green-700";
    if (v === "2") return "bg-rose-100 text-rose-800";
    return "";
};

export const buildFetchUrl = (params) => {
    const urlParams = new URLSearchParams();

    if (params.factory) urlParams.set("factory", params.factory);
    if (params.branch) urlParams.set("branch", params.branch);
    if (params.date) urlParams.set("date", params.date);
    if (params.aql) urlParams.set("aql", params.aql);

    return `/get/api/pinhole-data/?${urlParams.toString()}`;
};