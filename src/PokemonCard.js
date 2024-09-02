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

  if (loading) return <div className="animate-pulse bg-black bg-opacity-50 h-64 rounded-lg"></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!pokemonData) return null;

  const getTypeColor = (type) => {
    const colors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    return colors[type] || 'bg-gray-400';
  };

  return (
    <div 
      className="group bg-gradient-to-br from-black to-gray-800 rounded-xl p-6 transition-all duration-500 ease-in-out cursor-pointer transform hover:scale-105 border-2 border-green-400 hover:border-green-300 hover:shadow-[0_0_15px_rgba(52,211,153,0.5)] relative overflow-hidden"
      onClick={() => onClick(name)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-xl"></div>
      <div className="relative z-10">
        <div className="relative group-hover:animate-bounce transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
          <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${url.split('/')[6]}.png`} 
            alt={name} 
            className="w-40 h-40 mx-auto drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mt-4 capitalize text-green-300 drop-shadow-lg group-hover:text-green-200 transition-colors duration-300">{name}</h2>
        <div className="flex flex-wrap justify-center mt-3 gap-2">
          {pokemonData.types.map((type, index) => (
            <span 
              key={index} 
              className={`px-3 py-1 ${getTypeColor(type.type.name)} text-white rounded-full text-xs font-semibold shadow-md transition-all duration-300 group-hover:scale-110`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-green-300 group-hover:text-green-200 transition-colors duration-300">
          <span>HP: {pokemonData.stats[0].base_stat}</span>
          <span>ATK: {pokemonData.stats[1].base_stat}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
    </div>
  );
};

export default PokemonCard;