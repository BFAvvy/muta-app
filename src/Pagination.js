import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-purple-500 text-white rounded disabled:bg-purple-300 disabled:cursor-not-allowed transition duration-300 ease-in-out hover:bg-purple-600"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-purple-200 bg-opacity-50 text-purple-800 rounded">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-purple-500 text-white rounded disabled:bg-purple-300 disabled:cursor-not-allowed transition duration-300 ease-in-out hover:bg-purple-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;