import React, { useState } from "react";

const PaginationLogic = ({ data, pageSize, renderItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 30;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="politicians-list-container">
        {paginatedData.map((item, index) => renderItem(item, index))}
      </div>
      <div className="pagination">
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          className="pagination-prev"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="pagination-next"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PaginationLogic;
