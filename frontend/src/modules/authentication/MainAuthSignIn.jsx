import { PM_GROUP_MAIN_COLOR } from "@constants/Color";
import { useState, useEffect } from "react";
import useSignInForm from "./useSignInForm";

const MainAuthSignIn = () => {
  const {
    signInForm,
    handleSubmitSignInForm,
    handleOnChangeValue,
  } = useSignInForm();

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img
        src="http://10.13.100.101:8080/static/pictures/vngd_nbr_packing.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-xs brightness-75"
      />
      <div className="relative z-10 h-200 flex w-[80%] max-w-5xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-1/2 flex flex-col justify-center items-center text-white p-8 bg-black/40">
          <h1 className="text-6xl font-bold mb-3 tracking-wide">
            {dateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </h1>

          <p className="text-4xl font-light">
            {`${dateTime.getFullYear()}/${String(dateTime.getMonth() + 1).padStart(2, "0")}/${String(
              dateTime.getDate()
            ).padStart(2, "0")} ${dateTime.toLocaleDateString(undefined, { weekday: "long" })}`}
          </p>
        </div>

        <div className="w-1/2 flex justify-center items-center p-10 bg-[#024A54]">
          <form
            onSubmit={handleSubmitSignInForm}
            className="w-full max-w-sm space-y-4 text-gray-800"
          >
            {
              signInForm.isLoading ? (
                <>
                  <div className="absolute w-[50%] left-[50%] inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-[#038C8A] animate-spin"></div>
                      <span className="text-white text-xl font-semibold">Signing in</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 w-full flex justify-center">
                    <a href="/">
                      <img src="http://10.13.100.101:8080/static/base/logo.svg"
                        alt="PM Group Logo" className="h-auto max-w-full"
                      />
                    </a>
                  </div>
                  <h2 className="text-2xl font-semibold text-center mb-6 text-white">Sign in to PM Report</h2>

                  <div className="h-16">
                    {signInForm.errorMessage && (
                      <div className="flex items-center justify-center bg-red-200 border-2 border-red-700 rounded-lg h-full">
                        <p className="text-center text-lg font-bold text-[#024A54]">{signInForm.errorMessage}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xl font-medium mb-1 text-white">User ID</label>
                    <input
                      name="userId"
                      className="w-full bg-gray-300 border border-gray-600 rounded-lg px-3 py-2 text-[#024A54]
                           text-xl focus:outline-none focus:ring focus:ring-blue-300"
                      value={signInForm.userId}
                      placeholder="Enter user no"
                      onChange={handleOnChangeValue}
                      autoComplete="username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xl font-medium mb-1 text-white">Password</label>
                    <input
                      name="password"
                      className="w-full bg-gray-300 border border-gray-600 rounded-lg px-3 py-2 text-[#024A54]
                           text-xl focus:outline-none focus:ring focus:ring-blue-300"
                      type="password"
                      value={signInForm.password}
                      placeholder="Enter password"
                      onChange={handleOnChangeValue}
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      className={`w-1/2 h-16 bg-[#038C8A] ] rounded-lg py-2 border-2
                            text-[${PM_GROUP_MAIN_COLOR} text-xl
                            cursor-pointer hover:bg-gray-900 hover:border-[#038C8A] 
                            transition-all duration-300 disabled:opacity-60`}
                    >
                      <span className="text-white">Sign In</span>
                    </button>
                  </div>
                </>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainAuthSignIn;