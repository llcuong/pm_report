import { useState } from "react";

const usePaging = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 9;
  const totalPages = Math.ceil(90 / pageSize);

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

  return {
    currentPage, totalPages,
    goToPage,
    getPageNumbers,
  };
};

export default usePaging;