import { useEffect, useState } from "react";
import { signInAPI } from "./authServices";
import { setCookieAPI } from "@services/cookieServices";
import { useNavigate } from "react-router-dom";
import getCookie from "@utils/getCookie";

const useSignInForm = () => {
  const navigate = useNavigate();
  const [signInForm, setSignInForm] = useState({
    userId: '',
    password: '',
    errorMessage: '',
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
      setSignInForm(prev => ({ ...prev, errorMessage: 'Empty field: user id or password!' }));
      isError = true;
    };

    if (typeof userId !== 'string' || typeof password !== 'string') {
      setSignInForm(prev => ({ ...prev, errorMessage: 'Invalid input: user id or password!' }));
      isError = true;
    };

    return isError;
  };

  // Sign In logic
  const handleSubmitSignInForm = async (event) => {
    event.preventDefault();
    setSignInForm(prev => ({ ...prev, isLoading: true, errorMessage: '' }));

    // Check input data
    if (!checkCredentials({ userId: signInForm.userId, password: signInForm.password })) {
      setSignInForm(prev => ({ ...prev, isLoading: false }));
    };

    // Handle sign in time and status
    const startTime = Date.now();

    // Call API
    try {
      let resOfSignIn = await signInAPI({ userId: signInForm.userId, password: signInForm.password });

      // Set time for loading effect
      let elapsedTime = Date.now() - startTime;
      let remainingTime = Math.max(2000 - elapsedTime, 0);

      setTimeout(async () => {
        if (resOfSignIn) {
          setSignInForm(prev => ({
            userId: '', password: '',
            isLoading: false, errorMessage: ''
          }));

          navigate('/admin');
        } else {
          setSignInForm(prev => ({ ...prev, isLoading: false, errorMessage: resOfSignIn?.message || 'Sign in failed!' }))
        };
      }, remainingTime);
    } catch (error) {
      console.error('Error sign in: ', error);
      let elapsedTime = Date.now() - startTime;
      let remainingTime = Math.max(2000 - elapsedTime, 0);

      setTimeout(() => {
        setSignInForm(prev => ({ ...prev, isLoading: false, errorMessage: 'Internal Server Error!' }))
      }, remainingTime);
    };
  };

  return {
    signInForm,
    handleSubmitSignInForm,
    handleOnChangeValue,
  };
};

export default useSignInForm;