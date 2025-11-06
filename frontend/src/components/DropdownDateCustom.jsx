import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import "react-day-picker/dist/style.css";

const DropdownDateCustom = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || new Date());
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (day) => {
    if (!day) return;
    setSelected(day);
    onChange?.(day);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`h-[47px] flex items-center justify-between border-2 ${open ? "border-blue-400 shadow-md" : "border-gray-200"
          } bg-white rounded-lg px-4 py-3 text-left cursor-pointer transition-all duration-200 hover:border-blue-400 w-40`}

      >
        <span>{selected ? format(selected, "dd/MM/yyyy") : "Chọn ngày"}</span>
        <svg className="ml-1 h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 rounded-xl border border-gray-200 bg-white shadow-lg p-3">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            locale={vi}
            showOutsideDays
            disabled={{ after: new Date() }}
            classNames={{
              day_selected: "bg-blue-600 text-white",
              day_today: "border border-blue-500",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownDateCustom;