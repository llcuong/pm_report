import { useMemo } from "react";
import DropdownIcon from "@assets/icons/dropdown-icon";
import useDropdownDataCustom from "@hooks/useDropdownDataCustom";

const BADGE_COLOR_MAP = {
  green: "bg-green-100 text-green-800",
  blue: "bg-blue-100 text-blue-800",
  red: "bg-red-100 text-red-800",
  orange: "bg-orange-100 text-orange-800",
  gray: "bg-gray-100 text-gray-800",
};

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
  const {
    isOpen,
    selectedOption,
    toggleDropdown,
    handleSelectOption,
    dropdownRef,
    buttonRef,
    btnWidthPx,
  } = useDropdownDataCustom(value, onChange);

  const alignClass = menuAlign === "right" ? "right-0" : "left-0";

  // Memoized options rendering
  const renderedOptions = useMemo(() => {
    return options.map((option) => {
      const isSelected = selectedOption?.value === option.value;
      const badgeClass = BADGE_COLOR_MAP[option.badgeColor || "gray"];

      return (
        <div
          key={option.value}
          role="option"
          onClick={() => handleSelectOption(option)}
          className={`cursor-pointer px-4 py-3 transition-colors duration-150 border-b border-gray-100 
            last:border-b-0 ${isSelected ? "bg-[#1b9eaf]" : "hover:bg-[#aececf]"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className={`text-sm font-semibold ${isSelected ? "text-white" : "text-gray-900"}`}>
                {option.label}
              </div>
              {option.description && (
                <div
                  className={`text-xs mt-1 ${isSelected ? "text-white" : "text-gray-500"}`}
                >
                  {option.description}
                </div>
              )}
            </div>
            {option.badge &&
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
                {option.badge}
              </span>}
          </div>
        </div>
      );
    });
  }, [options, selectedOption, handleSelectOption]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        className={`flex items-center justify-between border-2 bg-white rounded-lg px-4 py-3 text-left
          ${isOpen ? "border-[#1b9eaf] shadow-md" : "border-gray-200"} cursor-pointer transition-all 
          duration-200 hover:border-[#1b9eaf] ${buttonClassName}`}
      >
        <span className={`text-sm font-medium truncate ${selectedOption ? "text-gray-900" : "text-gray-400 italic"}`}>
          {selectedOption?.label || placeholder}
        </span>
        <DropdownIcon isOpen={isOpen} className="text-[#1b9eaf]" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={`absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto ${alignClass} ${menuMatchButton ? "" : menuClassName}`}
          style={menuMatchButton ? { width: btnWidthPx ? `${btnWidthPx}px` : undefined } : undefined}
        >
          {renderedOptions}
        </div>
      )}
    </div>
  );
};

export default DropdownDataCustom;