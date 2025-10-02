import React from 'react';


const Pagination = ({ page, totalPages, onPageChange, pageSize, onPageSizeChange }) => {
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, start + 4);
  if (end - start < 4) start = Math.max(1, end - 4);
  const pageNumbers = [];
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>Prev</button>
      {start > 1 && <span>...</span>}
      {pageNumbers.map(num => (
        <button
          key={num}
          className={page === num ? 'active' : ''}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
      {end < totalPages && <span>...</span>}
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages || totalPages === 0}>Next</button>
      <span style={{ marginLeft: 16 }}>
        Rows per page:
        <select value={pageSize} onChange={e => onPageSizeChange(Number(e.target.value))} style={{ marginLeft: 6 }}>
          {[5, 10, 20, 50].map(sz => <option key={sz} value={sz}>{sz}</option>)}
        </select>
      </span>
    </div>
  );
};

export default Pagination;
