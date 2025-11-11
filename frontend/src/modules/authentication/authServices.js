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
  const token = getCookie('csrftoken');
  try {
    let resOfSignIn = await api.post('/users/login/',
      {
        user_id: userId,
        password: password,
      },
      {
        headers: {
          'X-CSRFToken': token,
        },
      });

    return {
      // Declare data from API
      detail: resOfSignIn.data?.detail,
      userId: resOfSignIn.data?.user.user_id,
      userName: resOfSignIn.data?.user.user_name,
      userEmail: resOfSignIn.data?.user.user_email,
      isStaff: resOfSignIn.data?.user.is_staff,
    };
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  };
};

export {
  signInAPI,
};