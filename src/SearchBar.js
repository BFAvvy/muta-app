import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search Pokémon"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-full bg-white bg-opacity-50 border-2 border-purple-300 focus:outline-none focus:border-purple-500 focus:bg-white focus:bg-opacity-70 transition duration-300 ease-in-out placeholder-purple-400 text-purple-800"
      />
    </div>
  );
};

export default SearchBar;