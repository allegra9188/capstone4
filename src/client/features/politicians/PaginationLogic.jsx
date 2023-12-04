import React, { useState } from "react";

const PaginationLogic = ({ data, renderItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div>
        {paginatedData.map((item) => renderItem(item))}
      </div>
      <div className="pagination">
        <p>Page {currentPage} of {totalPages}</p>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </>
  );
};

export default PaginationLogic;
