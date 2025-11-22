import api from "@configs/api";

// ===========================================
// Machine Data Declaration
// ===========================================
// IMPORT
// <-- factory: string
// <-- branch: string
// <-- signal: AbortSignal
// -------------------------------------------
// EXPORT (only data)
// --> MachineId: string
// --> MachineName: string
// ===========================================
const getMachineAPI = async ({ factory, branch, signal }) => {
  try {
    let resOfMachine = await api.get('/api/v1/machine', {
      params: {
        factory, branch
      },
      signal
    });

    console.log(resOfMachine)

    return {

    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};

export default {
  getMachineAPI,
}