import { useState } from "react";
import { TestData } from "../../TestData";

const useCheckbox = () => {
  const [selectedUserIdList, setSelectedUserIdList] = useState(new Set());

  // Handle select single
  const handleSelectUser = (id) => setSelectedUserIdList(prev => {
    const newSet = new Set(prev);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    return newSet;
  });

  // Handle select all
  const handleSelectAllUser = () => setSelectedUserIdList(prev => {
    const newSet = new Set(prev);
    newSet.size === TestData.length ? newSet.clear() : TestData.map(data => newSet.add(data.id));
    return newSet;
  });

  return {
    selectedUserIdList,
    handleSelectUser,
    handleSelectAllUser,
  };
};

export default useCheckbox;