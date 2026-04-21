export function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevClick = (e) => {
    e.preventDefault();
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleChangePage = (e, page) => {
    e.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const buildPageUrl = (page) => {
    const url = new URL(window.location);
    url.searchParams.set("page", page);
    return `${url.pathname}?${url.searchParams.toString()}`;
  };

  // Show limited pages for better UX
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;

    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2) return pages.slice(-5);

    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-center gap-2 py-8 mt-8"
      aria-label="Navegacion de paginas"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevClick}
        disabled={isFirstPage}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
          isFirstPage
            ? "opacity-40 cursor-not-allowed bg-soft-gray text-muted"
            : "bg-white text-dark border border-pinklight/50 hover:bg-pinklight/30 hover:border-primary/30 shadow-sm"
        }`}
        aria-label="Pagina anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {currentPage > 3 && totalPages > 5 && (
          <>
            <button
              onClick={(e) => handleChangePage(e, 1)}
              className="size-10 rounded-xl text-sm font-medium text-muted hover:bg-pinklight/30 hover:text-dark transition-all duration-200 cursor-pointer"
              href={buildPageUrl(1)}
            >
              1
            </button>
            <span className="px-2 text-muted">...</span>
          </>
        )}

        {visiblePages.map((page) => (
          <a
            key={page}
            onClick={(e) => handleChangePage(e, page)}
            href={buildPageUrl(page)}
            className={`size-10 rounded-xl text-sm font-medium flex items-center justify-center transition-all duration-200 ${
              currentPage === page
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "text-muted hover:bg-pinklight/30 hover:text-dark"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </a>
        ))}

        {currentPage < totalPages - 2 && totalPages > 5 && (
          <>
            <span className="px-2 text-muted">...</span>
            <button
              onClick={(e) => handleChangePage(e, totalPages)}
              className="size-10 rounded-xl text-sm font-medium text-muted hover:bg-pinklight/30 hover:text-dark transition-all duration-200 cursor-pointer"
              href={buildPageUrl(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNextClick}
        disabled={isLastPage}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
          isLastPage
            ? "opacity-40 cursor-not-allowed bg-soft-gray text-muted"
            : "bg-white text-dark border border-pinklight/50 hover:bg-pinklight/30 hover:border-primary/30 shadow-sm"
        }`}
        aria-label="Pagina siguiente"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
