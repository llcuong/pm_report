import { useEffect, useState } from "react";
import { signInAPI } from "./authServices";
import { setCookieAPI } from "@services/cookieServices";
import { useNavigate } from "react-router-dom";
import getCookie from "@utils/getCookie";
import { toast } from "react-toastify";

const useSignInForm = () => {
  const navigate = useNavigate();
  const [signInForm, setSignInForm] = useState({
    userId: '',
    password: '',
    isLoading: false,
  });

  useEffect(() => {
    const setCookie = async () => {
      await setCookieAPI();
    };

    setCookie();
  }, []);

  // Handle on typing value
  const handleOnChangeValue = (event) => {
    const {
      name, value,
    } = event.target;
    setSignInForm(prev => ({ ...prev, [name]: value }));
  };

  // Check input data
  const checkCredentials = ({ userId, password }) => {
    let isError = false;
    if (!userId || !password) {
      toast.error('Empty field: user id or password!');
      isError = true;
    };

    if (typeof userId !== 'string' || typeof password !== 'string') {
      toast.error('Invalid input: user id or password!');
      isError = true;
    };

    return isError;
  };

  // Sign In logic
  const handleSubmitSignInForm = async (event) => {
    event.preventDefault();
    setSignInForm(prev => ({ ...prev, isLoading: true }));

    // Check input data
    if (!checkCredentials({ userId: signInForm.userId, password: signInForm.password })) {
      setSignInForm(prev => ({ ...prev, isLoading: false }));
    };

    // Call API
    try {
      let resOfSignIn = await signInAPI({ userId: signInForm.userId, password: signInForm.password });

      if (resOfSignIn) {
        setSignInForm(prev => ({
          userId: '', password: '',
          isLoading: false,
        }));

        // Hard code to security
        localStorage.setItem('user_name', 'admin172185521517500');
        localStorage.setItem('is_admin', 'true');

        toast.success('Sign in successfully.');

        navigate('/admin');
      } else {
        setSignInForm(prev => ({ ...prev, isLoading: false }));
        toast.error('Sign in failed!');
      };
    } catch (error) {
      console.error('Error sign in: ', error);
      setSignInForm(prev => ({ ...prev, isLoading: false }));
      toast.error('Internal Server Error!');
    };
  };

  return {
    signInForm,
    handleSubmitSignInForm,
    handleOnChangeValue,
  };
};

export default useSignInForm;