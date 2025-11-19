import { useState } from "react";

const useUserAddNew = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "Superuser",
    department: "",
    accountStatus: "Active",
    password: "123456",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.department) {
      alert("Please fill all required fields.");
      return;
    }

    console.log("Submitting new user:", form);
    // API Call
  };

  return {
    form,
    handleChange,
    showPassword,
    togglePassword,
    handleSubmit,
  };
};

export default useUserAddNew;