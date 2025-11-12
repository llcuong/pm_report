import { useState, useEffect } from "react";
import useSignInForm from "./useSignInForm";
import CircularBackArrowIcon from "@assets/icons/circular-back-arrow-icon";
import LockIcon from "@assets/icons/lock-icon";
import EyeOpenIcon from "@assets/icons/eye-open-icon";
import AtIcon from "@assets/icons/at-icon";
import EyeCloseIcon from "@assets/icons/eye-close-icon";

const MainAuthSignIn = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

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
          <h2 className="text-lg font-medium">Sign in to PM Report</h2>
        </div>

        <form className="flex flex-col gap-3 bg-whwite p-8 w-90 rounded-2xl"
          onSubmit={handleSubmitSignInForm}
        >
          <div>
            <label className="text-[#151717] font-semibold">User ID </label>
          </div>
          <div className="border-2 border-[#ecedec] rounded-xl h-12 flex items-center pl-2 
                          transition-colors duration-200 ease-in-out focus-within:border-2 focus-within:border-[#2d79f3]">
            <AtIcon />
            <input type="text" className="ml-2 rounded-xl border-none w-[85%] h-full focus:outline-none"
              placeholder="Enter your ID"
              name="userId"
              value={signInForm.userId}
              onChange={handleOnChangeValue}
              autoComplete="username"
              required />
          </div>

          <div>
            <label className="text-[#151717] font-semibold">Password </label>
          </div>
          <div className="border-2 border-[#ecedec] rounded-xl h-12 flex items-center pl-2 
                          transition-colors duration-200 ease-in-out focus-within:border-2 focus-within:border-[#2d79f3]">
            <LockIcon />
            <input type={`${isShowPassword ? 'text' : 'password'}`}
              className="ml-2 rounded-xl border-none w-[85%] h-full focus:outline-none"
              placeholder="Enter your Password"
              name="password"
              value={signInForm.password}
              onChange={handleOnChangeValue}
              autoComplete="password"
              required />

            <button className="cursor-pointer" type="button"
              onClick={handleShowPassword}
            >
              {isShowPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
            </button>
          </div>

          <div className="flex-row flex items-center gap-2 justify-between">
            <div>
              <input type="checkbox" />
              <label className="ml-1 text-sm text-black font-normal">Remember me </label>
            </div>
            <span className="text-sm ml-1 text-[#2d79f3] font-medium cursor-pointer">Forgot password?</span>
          </div>

          <button className="self-end mt-5 ml-2 bg-[#151717] border-none 
                           text-white text-sm font-medium rounded-xl h-12 w-full cursor-pointer
                           hover:bg-[#252727]" type="submit">Sign In</button>
        </form>
        <div className="p-2 w-full flex justify-center mb-2">
          <a href="/" className="flex gap-2 transition-colors duration-200 hover:text-[#2d79f3]">
            <CircularBackArrowIcon />
            <p>Back to report</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainAuthSignIn;