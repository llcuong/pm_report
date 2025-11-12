import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import DropdownIcon from "@assets/icons/dropdown-icon";

const DropdownDateCustom = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || new Date());
  const dayPickerRef = useRef();

  // Handle open & close action of Day Picker
  useEffect(() => {
    const handler = (mouseEvent) => {
      if (dayPickerRef.current && !dayPickerRef.current.contains(mouseEvent.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Handle select date action
  const handleSelectDate = (date) => {
    if (!date) return;
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dayPickerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-[47px] flex items-center justify-between border-2 bg-white rounded-lg px-4 py-3 text-left 
                    ${isOpen ? `border-[#024A54] shadow-md` : "border-gray-200"} cursor-pointer transition-all 
                    duration-200 hover:border-[#024A54] w-40`}
      >
        <span className={`${isOpen ? `text-[#024A54]` : "text-gray-900"}`}>
          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Select date"}
        </span>
        <DropdownIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 rounded-xl border border-gray-200 bg-white shadow-lg p-3">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelectDate}
            locale={vi}
            showOutsideDays
            disabled={{ after: new Date() }}
            style={{
              "--rdp-accent-color": `#024A54`,
            }}

          />
        </div>
      )}
    </div>
  );
};

export default DropdownDateCustom;