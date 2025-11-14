import AuthorUserTaskList from "@constants/AuthorUserTaskList";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuthorUser = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Navigate when select a task
  const handleSelectedTask = (taskId) => {
    let navigateLink = AuthorUserTaskList.find(task => task.id === taskId).link;
    if (navigateLink) {
      navigate(navigateLink);
    } else {
      toast.error('Unknown link to navigate!');
    };
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return {
    isOpen,
    toggleDropdown,
    dropdownRef,
    handleSelectedTask,
  }
};

export default useAuthorUser;