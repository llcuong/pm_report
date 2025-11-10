import api from "@configs/api";
import getCookie from "@utils/getCookie";

// ===========================================
// Login Data Declaration
// ===========================================
// IMPORT
// <-- userId: string
// <-- password: string
// -------------------------------------------
// EXPORT
// --> detail: string
// --> user: Object { --> user_id: string
//                    --> user_name: string
//                    --> user_email: string
//                    --> is_staff: boolean }
// ===========================================
const signInAPI = async ({ userId, password }) => {
  try {
    let resOfLogin = await api.post('/post/users/login/',
      {
        user_id: userId,
        password: password,
      });
    return {
      // Declare data from API
      detail: resOfLogin.data?.detail,
      userId: resOfLogin.data?.user.user_id,
      userName: resOfLogin.data?.user.user_name,
      userEmail: resOfLogin.data?.user.user_email,
      isStaff: resOfLogin.data?.user.is_staff,
    };
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  };
};

export {
  signInAPI,
};