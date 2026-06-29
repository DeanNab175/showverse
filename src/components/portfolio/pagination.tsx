interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Portfolio pagination"
      className="flex items-center justify-center gap-3 mt-10"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center justify-center size-9 rounded-md text-body-txt disabled:opacity-40 disabled:cursor-not-allowed hover:text-primary transition-colors"
      >
        <ArrowIcon />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage}
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center size-9 rounded-md text-xs-plus font-medium transition-colors ${
            page === currentPage
              ? "bg-primary text-button-primary-txt"
              : "text-body-txt hover:bg-skills-card"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center justify-center size-9 rounded-md text-body-txt disabled:opacity-40 disabled:cursor-not-allowed hover:text-primary transition-colors"
      >
        <ArrowIcon className="rotate-180" />
      </button>
    </nav>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19 12H5M5 12l6-6M5 12l6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Pagination;
