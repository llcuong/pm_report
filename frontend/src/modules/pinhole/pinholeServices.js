import api from "@configs/api";
import { format } from "date-fns";

// ===========================================
// Pinhole Report Data Declaration
// ===========================================
// INPUT
// --> factory: string
// --> branch: string
// --> date: Date
// --> aql: string | number
// --> signal: AbortSignal
// -------------------------------------------
// OUTPUT
// <-- title: string
// <--aql_list: (string | number)[]
// <-- pinhole_data: Object[]
// ===========================================
const getPinholeReportDataAPI = async ({ aql, factory, branch, date, signal }) => {
  try {
    let formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
    let resOfPinholeReportData = await api.get('/api/pinhole-data', {
      params: { aql, factory, branch, date: formattedDate },
      signal
    });

    if (resOfPinholeReportData) {
      // Declare data from API
      return {
        title: resOfPinholeReportData.data.title,
        aql_list: resOfPinholeReportData.data.aql_list,
        pinhole_data: resOfPinholeReportData.data.pinhole_data,
      };
    } else {
      return null;
    };
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  };
};

export {
  getPinholeReportDataAPI,
};