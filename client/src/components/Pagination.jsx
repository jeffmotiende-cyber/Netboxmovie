export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex-center" style={{ gap: 8, marginTop: 32 }}>
      <button
        className="btn btn-ghost btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {start > 1 && (
        <>
          <button className="btn btn-ghost btn-sm" onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span className="text-muted">...</span>}
        </>
      )}
      {pages.map((page) => (
        <button
          key={page}
          className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-muted">...</span>}
          <button className="btn btn-ghost btn-sm" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}
      <button
        className="btn btn-ghost btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
