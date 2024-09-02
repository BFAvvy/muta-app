import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-black text-green-400 rounded-full border border-green-400 disabled:bg-gray-800 disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-400 hover:text-black"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-black bg-opacity-80 text-green-400 rounded-full border border-green-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-black text-green-400 rounded-full border border-green-400 disabled:bg-gray-800 disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-400 hover:text-black"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;