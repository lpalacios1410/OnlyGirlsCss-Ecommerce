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
    return `${url.pathname} ${url.searchParams.toString()}`;
  };

  return (
    <nav className="flex items-center w-full justify-center gap-8 py-8 mt-5 text-xl">
      <button
        href={buildPageUrl(currentPage - 1)}
        onClick={handlePrevClick}
        disabled={isFirstPage}
        className={`${
          isFirstPage
            ? "opacity-0"
            : "hover:scale-150 hover:bg-wine hover:rounded-lg p-1 hover:text-white transition duration-300"
        }`}
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </button>

      {pages.map((page) => (
        <a
          onClick={(event) => handleChangePage(event, page)}
          className={`${
            currentPage === page
              ? "text-white rounded-lg bg-wine w-8 h-8 flex items-center justify-center"
              : "text-muted w-8 h-8 flex items-center justify-center hover:bg-wine/50 hover:text-white rounded-lg transition duration-600"
          }`}
          key={page}
          href={buildPageUrl(page)}
        >
          {page}{" "}
        </a>
      ))}
      <button
        href={buildPageUrl(currentPage + 1)}
        onClick={handleNextClick}
        disabled={isLastPage}
        className={`${
          isLastPage
            ? "opacity-0"
            : "hover:scale-150 hover:bg-wine hover:rounded-lg p-1 hover:text-white transition duration-300"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </button>
    </nav>
  );
}
