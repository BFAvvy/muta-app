import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonCard = ({ name, url, onClick }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(url);
        setPokemonData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching Pokemon data');
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [url]);

  if (loading) return <div className="animate-pulse bg-purple-200 bg-opacity-50 h-48 rounded-lg"></div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!pokemonData) return null;

  return (
    <div 
      className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg border border-purple-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105 hover:bg-opacity-50"
      onClick={() => onClick(name)}
    >
      <img 
        src={pokemonData.sprites.front_default} 
        alt={name} 
        className="w-32 h-32 mx-auto"
      />
      <h2 className="text-xl font-semibold text-center mt-2 capitalize text-purple-900">{name}</h2>
      <div className="flex flex-wrap justify-center mt-2">
        {pokemonData.types.map((type, index) => (
          <span 
            key={index} 
            className="px-2 py-1 bg-purple-200 bg-opacity-50 text-purple-800 rounded-full text-sm mr-1 mb-1"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;