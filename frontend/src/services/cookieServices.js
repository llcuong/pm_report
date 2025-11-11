import api from "@configs/api";

const setCookieAPI = async () => {
  let resOfCookie = await api.get('/users/csrf');
  if (resOfCookie) {
    console.log('Set cookie successfully!');
    return resOfCookie.data;
  } else {
    return null;
  };
};

export {
  setCookieAPI,
}