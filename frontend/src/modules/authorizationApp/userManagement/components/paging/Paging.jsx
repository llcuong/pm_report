import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import usePaging from "./usePaging";

const Paging = () => {
  const {
    currentPage, totalPages,
    goToPage,
    getPageNumbers,
  } = usePaging();

  return (
    <div className="relative flex flex-col items-center mt-2">
      <div className="absolute left-0">
        <p className="text-gray-400 text-[18px]">
          Page {currentPage} of {totalPages}
        </p>
      </div>
      <div className="flex items-center gap-2 text-2xl">
        <button onClick={() => goToPage(1)} className="hover:text-blue-500 cursor-pointer">
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="hover:text-blue-500  cursor-pointer"
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
                className={`px-3 py-1 rounded-lg text-[18px] transition-all duration-300 cursor-pointer
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
          className="hover:text-blue-500 cursor-pointer"
        >
          <MdOutlineKeyboardArrowRight />
        </button>
        <button onClick={() => goToPage(totalPages)} className="hover:text-blue-500 cursor-pointer">
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Paging;