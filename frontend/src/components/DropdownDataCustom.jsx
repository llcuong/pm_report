import DropdownIcon from "@assets/icons/dropdown-icon";
import { useState, useEffect, useRef } from "react";

const DropdownDataCustom = ({
  options = [],
  placeholder = "Select option",
  value,
  onChange,

  buttonClassName = "w-64",
  menuClassName = "w-80",
  menuMatchButton = false,
  menuAlign = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || null);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [btnWidthPx, setBtnWidthPx] = useState(0);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onChange?.(option);
    setIsOpen(false);
  };

  // Handle open & close action of dropdown
  useEffect(() => {
    const handleClickOutside = (mouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(mouseEvent.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Set latest selected option
  useEffect(() => {
    setSelectedOption(value || null);
  }, [value]);

  // Get the width of the select button
  const measure = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setBtnWidthPx(rect.width);
  };

  // Resize for each select button
  useEffect(() => {
    if (!buttonRef.current) return;
    measure();
    if (isOpen) measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(buttonRef.current);
    return () => resizeObserver.disconnect();
  }, [isOpen]);

  const alignClass = menuAlign === "right" ? "right-0" : "left-0";

  return (
    <div ref={dropdownRef} className='relative'>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        className={`flex items-center justify-between border-2 bg-white rounded-lg px-4 py-3 text-left
                    ${isOpen ? `border-[#024A54] shadow-md` : "border-gray-200"}  cursor-pointer transition-all 
                    duration-200 hover:border-[#024A54] ${buttonClassName}`}
      >
        <span className={`${isOpen ? `text-[#024A54]` : 'text-gray-900'} text-sm font-medium truncate`}>
          {selectedOption?.label || placeholder}
        </span>
        <div className={`text-[#024A54]`}>
          <DropdownIcon isOpen={isOpen} />
        </div>
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 
                      overflow-auto ${alignClass} ${menuMatchButton ? "" : menuClassName}`}
          style={menuMatchButton ? { width: btnWidthPx ? `${btnWidthPx}px` : undefined } : undefined}
        >
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleSelectOption(option)}
              className={`cursor-pointer px-4 py-3  transition-colors duration-150 border-b border-gray-100 
                          last:border-b-0 ${selectedOption?.value === option.value ? `bg-[#024A54]` : "hover:bg-[#aececf]"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${selectedOption?.value === option.value ? 'text-white' : 'text-gray-900 '} `}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className={`${selectedOption?.value === option.value ? `bg-[#024A54] text-white` : "hover:bg-[#aececf] text-gray-500"} 
                                    text-xs mt-1 transition-colors duration-200`}>
                      {option.description}
                    </div>
                  )}
                </div>
                {option.badge && (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${{
                      green: "bg-green-100 text-green-800",
                      blue: "bg-blue-100 text-blue-800",
                      red: "bg-red-100 text-red-800",
                      orange: "bg-orange-100 text-orange-800",
                      gray: "bg-gray-100 text-gray-800",
                    }[option.badgeColor || "gray"]
                      }`}
                  >
                    {option.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownDataCustom;