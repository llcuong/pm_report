import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const PopUpCustom = ({
  isOpen,
  onClose,
  title,
  description,
  inputs = [],
  buttons = [],
}) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div
        ref={popupRef}
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl animate-scaleIn relative"
      >
        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="text-gray-600 mt-2">{description}</p>

        <div className="mt-4 space-y-3">
          {inputs.slice(0, 3).map((input, index) => (
            <div key={index}>
              <label className="block font-medium mb-1">{input.label}</label>
              <input
                type="text"
                value={input.value}
                onChange={input.onChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          {buttons.slice(0, 3).map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className="px-4 py-2 rounded-lg font-medium transition cursor-pointer"
              style={{
                backgroundColor: btn.bg || "#3b82f6",
                color: btn.textColor || "#fff",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer transition"
        >
          <IoMdClose className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default PopUpCustom;