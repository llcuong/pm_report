import { useState, useEffect, useRef } from "react";

const DropdownDataCustom = ({
  options = [],
  placeholder = "Select option",
  value,
  onChange,

  containerClassName = "relative",
  buttonClassName = "w-64",
  menuClassName = "w-80",
  menuMatchButton = false,
  menuAlign = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [btnWidthPx, setBtnWidthPx] = useState(0);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = (option) => {
    setSelected(option);
    onChange?.(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelected(value || null);
  }, [value]);

  useEffect(() => {
    if (!buttonRef.current) return;
    const measure = () => {
      const rect = buttonRef.current.getBoundingClientRect();
      setBtnWidthPx(rect.width);
    };
    measure();
    if (isOpen) measure();
    const ro = new ResizeObserver(measure);
    ro.observe(buttonRef.current);
    return () => ro.disconnect();
  }, [isOpen]);

  const alignClass = menuAlign === "right" ? "right-0" : "left-0";

  return (
    <div ref={dropdownRef} className={`${containerClassName}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        className={`flex items-center justify-between border-2 ${isOpen ? "border-blue-400 shadow-md" : "border-gray-200"
          } bg-white rounded-lg px-4 py-3 text-left cursor-pointer transition-all duration-200 hover:border-blue-400 ${buttonClassName}`}
      >
        <span className="text-gray-900 text-sm font-medium truncate">
          {selected?.label || placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto ${alignClass} ${menuMatchButton ? "" : menuClassName}`}
          style={menuMatchButton ? { width: btnWidthPx ? `${btnWidthPx}px` : undefined } : undefined}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer px-4 py-3 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${selected?.value === option.value ? "bg-blue-100" : ""
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">
                    {option.label}
                  </div>
                  {option.description && (
                    <div className="text-xs text-gray-500 mt-1">
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