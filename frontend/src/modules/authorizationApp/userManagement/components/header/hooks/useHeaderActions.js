import useConfirmChanges from "@hooks/useConfirmChanges";
import { ACTIONS } from "../actionTypes";
import { useRef } from "react";
import useUserManagementContext from "@modules/authorizationApp/userManagement/contexts/useUserManagementContext";

const useHeaderActions = ({ action, closePopup }) => {
  const timeRef = useRef(null);

  const { sortedList, handleSetPagedList, setSelectedList } = useUserManagementContext();
  const { confirmPassword, setConfirmPassword } = useConfirmChanges();

  const handleDelete = () => {
  };

  const handleSetStatus = () => {
  };

  const confirmAction = () => {
    const mapping = {
      [ACTIONS.DELETE]: () => handleDelete(),
      [ACTIONS.ACTIVATE]: () => handleSetStatus(),
      [ACTIONS.DEACTIVATE]: () => handleSetStatus(),
    };

    mapping[action]?.();
    setConfirmPassword('');
    closePopup();
  };

  // Handle main return data from search value logic
  const performSearch = (value) => {
    const clean = String(value).toLowerCase().trim();

    if (clean === '') {
      handleSetPagedList(sortedList);
      setSelectedList([]);
      return;
    }

    const filteredList = sortedList.filter(user => {
      const idMatch = String(user.id).includes(clean);
      const nameMatch = user.fullName.toLowerCase().includes(clean);
      return idMatch || nameMatch;
    });

    handleSetPagedList(filteredList);
    setSelectedList([]);
  };

  // Handle submit search bar
  const onSubmit = (event) => {
    event.preventDefault();
    const searchValue = event.target.search.value;
    performSearch(searchValue);
  };

  // Handle typing search bar
  const onSearch = (value) => {
    if (timeRef.current)
      clearTimeout(timeRef.current);

    timeRef.current = setTimeout(() => {
      performSearch(value);
    }, 2000);
  };

  return {
    confirmPassword,
    setConfirmPassword,
    confirmAction,

    onSearch,
    onSubmit,
  };
};

export default useHeaderActions;