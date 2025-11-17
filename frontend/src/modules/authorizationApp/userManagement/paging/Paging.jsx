import { useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const Paging = () => {
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Generate sliding page window
  const getPageNumbers = () => {
    const pages = [];

    // Always show first
    pages.push(1);

    let start = currentPage - 1;
    let end = currentPage + 1;

    if (start < 2) {
      start = 2;
      end = 4;
    }

    if (end > totalPages - 1) {
      end = totalPages - 1;
      start = totalPages - 3;
    }

    // Ellipsis after first if sliding
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }

    // Ellipsis before last if sliding
    if (end < totalPages - 1) pages.push("...");

    // Always show last
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="relative flex flex-col items-center mt-4">
      <div className="absolute left-0">
        <p className="text-gray-400 text-[18px]">
          Page {currentPage} of {totalPages}
        </p>
      </div>
      <div className="flex items-center gap-2 text-2xl">
        <button onClick={() => goToPage(1)} className="hover:text-blue-500">
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="hover:text-blue-500"
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <div className="flex gap-2 transition-all duration-300 animate-fade">
          {getPageNumbers().map((num, i) =>
            num === "..." ? (
              <span key={i} className="px-2 text-xl">
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => goToPage(num)}
                className={`px-3 py-1 rounded-lg text-[18px] transition-all duration-300
                  ${num === currentPage
                    ? "bg-blue-500 text-white shadow-md scale-105"
                    : "hover:bg-gray-200"
                  }
                `}
              >
                {num}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="hover:text-blue-500"
        >
          <MdOutlineKeyboardArrowRight />
        </button>
        <button onClick={() => goToPage(totalPages)} className="hover:text-blue-500">
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Paging;