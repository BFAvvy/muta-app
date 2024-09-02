import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search Pokémon"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-full bg-black bg-opacity-80 border-2 border-green-400 focus:outline-none focus:border-green-500 focus:bg-black focus:bg-opacity-90 transition duration-300 ease-in-out placeholder-green-400 text-green-400"
      />
    </div>
  );
};

export default SearchBar;