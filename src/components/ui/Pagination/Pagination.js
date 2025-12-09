function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    // Always show first and last page
    // Show up to 3 pages around current page
    
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1]; 
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Ensure we show 3 middle pages when possible
    if (end - start < 2) {
      if (start === 2) {
        end = Math.min(totalPages - 1, start + 2);
      } else if (end === totalPages - 1) {
        start = Math.max(2, end - 2);
      }
    }

   ed
    if (start > 2) {
      pages.push('...');
    }

   
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

   
    if (end < totalPages - 1) {
      pages.push('...');
    }

    // Always include last page
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between p-4">
      {/* Left side: Show result */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Show result:</span>
        <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-gray-800 font-medium">
          {currentPage}
        </div>
      </div>

      {/* Right side: Pagination buttons */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={currentPage === page}
              className={`px-3 py-1 text-xs border rounded-lg transition-colors ${
                currentPage === page
                  ? "border-blue-500 bg-blue-50 text-blue-600 font-medium"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Pagination;