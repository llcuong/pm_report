import api from "@configs/api";

const getCookieAPI = async () => {
  let resOfCookie = await api.get('/users/csrf');
  if (resOfCookie) {
    return resOfCookie.data;
  } else {
    return null;
  };
};

export {
  getCookieAPI,
}