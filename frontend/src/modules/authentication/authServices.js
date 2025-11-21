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
// --> user: Object { --> userId: string
//                    --> userName: string
//                    --> userEmail: string
//                    --> isStaff: boolean }
// ===========================================
const signInAPI = async ({ userId, password }) => {
  const token = getCookie('csrftoken');
  try {
    let resOfSignIn = await api.post('/users/post-login/',
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
      userId: resOfSignIn.data?.user.userId,
      userName: resOfSignIn.data?.user.userName,
      userEmail: resOfSignIn.data?.user.userEmail,
      isStaff: resOfSignIn.data?.user.isStaff,
    };
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  };
};

export {
  signInAPI,
};