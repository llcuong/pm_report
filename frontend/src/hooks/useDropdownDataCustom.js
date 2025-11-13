import { useState, useEffect, useRef } from "react";
import { LANG } from "./useLang";
import { LANGUAGE_LIST } from "@constants/LanguageList";

const useDropdownDataCustom = (value = null, onChange) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || null);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [btnWidthPx, setBtnWidthPx] = useState(0);

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

  // Keep selectedOption in sync with prop `value`
  useEffect(() => {
    if (value && value.value !== selectedOption?.value) {
      setSelectedOption(value);
    };
  }, [value, selectedOption]);

  // Observe resize
  useEffect(() => {
    if (!buttonRef.current) return;
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(buttonRef.current);
    return () => resizeObserver.disconnect();
  }, [isOpen]);

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Handle selection
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onChange?.(option);
    setIsOpen(false);
  };

  // Measure button width
  const measure = () => {
    if (buttonRef.current) {
      setBtnWidthPx(buttonRef.current.getBoundingClientRect().width);
    }
  };

  return {
    isOpen,
    selectedOption,
    toggleDropdown,
    closeDropdown,
    handleSelectOption,
    dropdownRef,
    buttonRef,
    btnWidthPx,
    setSelectedOption,
  };
};

export default useDropdownDataCustom;