const DropdownIcon = ({ isOpen }) => {
  return (
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      fill="none" stroke={isOpen ? `#024A54` : 'currentColor'} viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export default DropdownIcon;