const getColorClassname = (code) => {
  const value = (code || "").toString().trim();
  if (value === "0") return "bg-gray-200 text-[#6b7280]";
  if (value === "11") return "bg-white text-dark";
  if (value === "12") return "bg-white text-dark"; //"bg-green-100 text-green-700";
  if (value === "2") return "bg-rose-100 text-rose-800";
  return "";
};

export default getColorClassname;