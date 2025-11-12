import api from "@configs/api";
import { format } from "date-fns";

// ===========================================
// Pinhole Report Data Declaration
// ===========================================
// IMPORT
// <-- factory: string
// <-- branch: string
// <-- date: Date
// <-- aql: string | number
// <-- signal: AbortSignal
// -------------------------------------------
// EXPORT
// --> title: string
// --> aql_list: (string | number)[]
// --> pinhole_data: Object[]
// ===========================================
const getPinholeReportDataAPI = async ({ aql, factory, branch, date, signal }) => {
  try {
    let formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
    let resOfPinholeReportData = await api.get('/api/pinhole-data/', {
      params: { aql, factory, branch, date: formattedDate },
      signal
    });

    return {
      // Declare data from API
      title: resOfPinholeReportData.data.title,
      aql_list: resOfPinholeReportData.data.aql_list,
      pinhole_data: resOfPinholeReportData.data.pinhole_data,
    };
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  };
};

export {
  getPinholeReportDataAPI,
};