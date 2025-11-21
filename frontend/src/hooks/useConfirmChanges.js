import { useEffect, useState } from "react";

const useConfirmChanges = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // API to check password
  }, [confirmPassword]);

  return {
    confirmPassword, setConfirmPassword,
    error,
  };
};

export default useConfirmChanges;