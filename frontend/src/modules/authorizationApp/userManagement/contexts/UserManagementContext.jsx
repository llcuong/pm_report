import React, { createContext, useEffect, useState } from "react";
import { TestData } from "../TestData";

// Data returned
/**
 * @typedef {Object} UserList
 * @property {string} id
 * @property {string | null} avatar
 * @property {string | null} fullName
 * @property {string | null} email
 * @property {string | null} department
 * @property {string | null} accountStatus
 * @property {string | null} role
 */

/**
 * @typedef {Object} UserManagementContextValue
 * @property {UserList[]} userList
 * @property {UserList[]} sortedList
 * @property {() => void} setSortedList
 * @property {UserList[]} pagedList
 * @property {(value: UserList[]) => void} handleSetPagedList
 * 
 * @property {UserList[]} selectedList
 * @property {() => void} setSelectedList
 */

/**
 * @type {React.Context<UserManagementContextValue> | null}
 */

export const UserManagementContext = createContext(null);

export const UserManagementProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [pagedList, setPagedList] = useState([]);

  const [selectedList, setSelectedList] = useState([]);

  // Get user list from API and sort by latest createdAt
  useEffect(() => {
    setUserList(TestData);
  }, []);

  // Copy user list to sorted list
  useEffect(() => {
    setSortedList(userList);
  }, [userList]);

  // Handle paging
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const handleSetPagedList = (sortedList) => {
    let startIdx = (currentPage - 1) * pageSize;
    let endIdx = currentPage * pageSize;
    let currentPageData = sortedList.slice(startIdx, endIdx);
    setPagedList(currentPageData);
  };

  useEffect(() => {
    handleSetPagedList(sortedList);
  }, [sortedList, currentPage]);

  const stateValueList = {
    userList,
    sortedList, setSortedList,
    pagedList, handleSetPagedList,
    selectedList, setSelectedList,
  };

  return (
    <UserManagementContext.Provider value={stateValueList}>
      {children}
    </UserManagementContext.Provider>
  );
};