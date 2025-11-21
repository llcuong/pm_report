import { useState } from "react";

const useDataTable = ({
  userList,
  sortedList, setSortedList,
  pagedList, handleSetPagedList,
  selectedList, setSelectedList,
}) => {

  const handleSelectUser = (id) => {
    setSelectedList(prev => {
      if (prev.some(u => u.id === id))
        return prev.filter(u => u.id !== id);

      const user = sortedList.find(u => u.id === id);
      if (!user) return prev;

      return [...prev, user];
    });
  };

  const handleSelectAllUser = () => {
    setSelectedList(prev =>
      prev.length === sortedList.length ? [] : sortedList
    );
  };

  const [filteredByStatus, setFilteredByStatus] = useState(null);

  const onSort = (attribute, value) => {
    let listToSort = [];

    // Special filter for Status
    if (attribute === "status") {
      if (value === "active")
        listToSort = userList.filter(u => u.accountStatus === "Active");
      else if (value === "inactive")
        listToSort = userList.filter(u => u.accountStatus !== "Active");
      else
        listToSort = [...userList];

      setFilteredByStatus(listToSort);
      handleSetPagedList(listToSort);
      setSelectedList([]);
      return;
    }

    listToSort = filteredByStatus ?? [...sortedList];

    listToSort.sort((a, b) => {
      let aVal = typeof a[attribute] === "string" ? a[attribute].toLowerCase() : a[attribute];
      let bVal = typeof b[attribute] === "string" ? b[attribute].toLowerCase() : b[attribute];

      if (aVal < bVal) return value === "asc" ? -1 : 1;
      if (aVal > bVal) return value === "asc" ? 1 : -1;
      return 0;
    });

    handleSetPagedList(listToSort);
    setSelectedList([]);
  };

  return {
    handleSelectUser,
    handleSelectAllUser,
    onSort,
  };
};

export default useDataTable;