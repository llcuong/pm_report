import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CiAt, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import useSignInForm from "./useSignInForm";

import { LANG } from "@hooks/useLang";

const MainAuthSignIn = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentLang = localStorage.getItem(LANG);
    if (currentLang !== i18n.language) {
      i18n.changeLanguage(currentLang);
    };
  }, []);

  const handleShowPassword = () => {
    setIsShowPassword(prev => !prev);
  };

  const {
    signInForm,
    handleSubmitSignInForm,
    handleOnChangeValue,
  } = useSignInForm();

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="w-90 h-130 flex flex-col justify-center items-center border border-gray-200 shadow-xl rounded-2xl">
        <div>
          <h2 className="text-lg font-medium">{t('signIn.signInTitle')}</h2>
        </div>

        <form className="flex flex-col gap-3 bg-whwite p-8 w-90 rounded-2xl"
          onSubmit={handleSubmitSignInForm}
        >
          <div>
            <label className="text-[#151717] font-semibold">{t('signIn.userId')}</label>
          </div>
          <div className="border-2 border-[#ecedec] rounded-xl h-12 flex items-center pl-2 
                          transition-colors duration-200 ease-in-out focus-within:border-2 focus-within:border-[#2d79f3] text-2xl">
            <CiAt />
            <input type="text" className="ml-2 rounded-xl border-none w-[85%] h-full focus:outline-none text-lg"
              placeholder="Enter your ID"
              name="userId"
              value={signInForm.userId}
              onChange={handleOnChangeValue}
              autoComplete="username"
              required />
          </div>

          <div>
            <label className="text-[#151717] font-semibold">{t('signIn.password')}</label>
          </div>
          <div className="border-2 border-[#ecedec] rounded-xl h-12 flex items-center pl-2 
                          transition-colors duration-200 ease-in-out focus-within:border-2 focus-within:border-[#2d79f3] text-2xl">
            <CiLock />
            <input type={`${isShowPassword ? 'text' : 'password'}`}
              className="ml-2 rounded-xl border-none w-[85%] h-full focus:outline-none text-lg"
              placeholder="Enter your Password"
              name="password"
              value={signInForm.password}
              onChange={handleOnChangeValue}
              autoComplete="password"
              required />

            <button className="cursor-pointer text-lg mr-2" type="button"
              onClick={handleShowPassword}
            >
              {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <div className="flex-row flex items-center gap-2 justify-between">
            <div>
              <input type="checkbox" />
              <label className="ml-1 text-sm text-black font-normal">{t('signIn.rememberMe')}</label>
            </div>
            <span className="text-sm ml-1 text-[#2d79f3] font-medium cursor-pointer">{t('signIn.forgotPassword')}</span>
          </div>

          <button className="self-end mt-5 ml-2 bg-[#151717] border-none 
                           text-white text-sm font-medium rounded-xl h-12 w-full cursor-pointer
                           hover:bg-[#252727]" type="submit">{t('signIn.signInButton')}</button>
        </form>
        <div className="p-2 w-full flex justify-center mb-2">
          <a href="/" className="flex gap-2 transition-colors duration-200 hover:text-[#2d79f3]">
            <span className="text-2xl"><IoArrowBackCircleOutline /></span>
            <p>{t('signIn.backToReport')}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainAuthSignIn;