import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetail = ({ name, onBack }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching Pokemon details');
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [name]);

  if (loading) return <div className="text-center text-green-400">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!pokemon) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div>
            <p className="text-green-300 mb-2">Height: {pokemon.height / 10} m</p>
            <p className="text-green-300 mb-2">Weight: {pokemon.weight / 10} kg</p>
            <h3 className="font-bold text-xl mb-2 text-green-400">Abilities:</h3>
            <ul className="list-disc list-inside text-green-300">
              {pokemon.abilities.map((ability, index) => (
                <li key={index} className="capitalize">{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        );
      case 'stats':
        return (
          <div>
            {pokemon.stats.map((stat, index) => (
              <div key={index} className="mb-2">
                <p className="text-green-400 capitalize">{stat.stat.name}: {stat.base_stat}</p>
                <div className="w-full bg-green-900 rounded-full h-2.5">
                  <div className="bg-green-400 h-2.5 rounded-full" style={{ width: `${(stat.base_stat / 255) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'moves':
        return (
          <div className="grid grid-cols-2 gap-2">
            {pokemon.moves.slice(0, 8).map((move, index) => (
              <span key={index} className="px-3 py-1 bg-black bg-opacity-50 text-green-400 rounded-full text-sm capitalize border border-green-400">
                {move.move.name}
              </span>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-black to-gray-800 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-2xl mx-auto border-2 border-green-400 transform transition-all duration-500 hover:scale-105">
      <button 
        onClick={onBack}
        className="mb-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-black font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-110 shadow-lg"
      >
        Back to List
      </button>
      <div className="flex flex-col md:flex-row items-center">
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name} 
          className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-green-400 shadow-lg transform transition-transform duration-300 hover:scale-110"
        />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold mb-4 capitalize text-green-400 drop-shadow-lg">{pokemon.name}</h2>
          <div className="flex mb-4">
            {pokemon.types.map((type, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-black bg-opacity-50 text-green-400 rounded-full text-sm mr-2 capitalize border border-green-400 shadow-md"
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="flex mb-4">
            {['about', 'stats', 'moves'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`mr-2 px-3 py-1 rounded-full text-sm capitalize shadow-md ${
                  activeTab === tab ? 'bg-green-400 text-black' : 'bg-black bg-opacity-50 text-green-400 border border-green-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;