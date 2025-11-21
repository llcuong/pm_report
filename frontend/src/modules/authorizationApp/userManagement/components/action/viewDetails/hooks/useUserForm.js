import { TestData } from "@modules/authorizationApp/userManagement/TestData";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useUserForm = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const [form, setForm] = useState({
    id: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    role: '',
    factory: '',
    accountStatus: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const user = TestData.find(u => u.id === Number(userId)) ?? {};

    resetForm({
      id: user.id || '',
      fullName: user.fullName || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      role: user.role || '',
      factory: user.factory || '',
      accountStatus: user.accountStatus || 'Inactive',
    });
  }, [userId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = data => setForm(data);

  return {
    form, setForm, handleChange,
    isEditMode, setIsEditMode,
    resetForm
  };
};

export default useUserForm;