import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import SearchBar from './SearchBar';
import PokemonDetail from './PokemonDetail';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        setPokemon(response.data.results);
        setFilteredPokemon(response.data.results);
        setTotalPages(Math.ceil(response.data.results.length / itemsPerPage));
        setLoading(false);
      } catch (err) {
        setError('Error fetching Pokemon');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = pokemon.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const handlePokemonClick = (name) => {
    setSelectedPokemon(name);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getPaginatedPokemon = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPokemon.slice(startIndex, endIndex);
  };

  if (loading) return <div className="text-center text-2xl mt-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-2xl mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
     
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-300 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-green-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

     
      <div className="container mx-auto px-4 py-8 relative z-10">
        
        <div className="flex justify-center items-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <h1 className="relative text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg animate-pulse">
              Poké-Muta
            </h1>
          </div>
        </div>
        <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 backdrop-filter backdrop-blur-lg">
          <SearchBar onSearch={handleSearch} />
          {selectedPokemon ? (
            <PokemonDetail name={selectedPokemon} onBack={() => setSelectedPokemon(null)} />
          ) : (
            <>
              <PokemonList 
                pokemon={getPaginatedPokemon()} 
                onPokemonClick={handlePokemonClick} 
              />
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;