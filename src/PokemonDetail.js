import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetail = ({ name, onBack }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-center text-purple-800">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!pokemon) return null;

  return (
    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Back to List
      </button>
      <div className="flex flex-col md:flex-row items-center">
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name} 
          className="w-48 h-48 md:w-64 md:h-64"
        />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold mb-4 capitalize text-purple-900">{pokemon.name}</h2>
          <div className="mb-4">
            <h3 className="font-bold text-xl mb-2 text-purple-800">Abilities:</h3>
            <ul className="list-disc list-inside text-purple-700">
              {pokemon.abilities.map((ability, index) => (
                <li key={index} className="capitalize">{ability.ability.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2 text-purple-800">Types:</h3>
            <div className="flex flex-wrap">
              {pokemon.types.map((type, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-purple-200 bg-opacity-50 text-purple-800 rounded-full text-sm mr-2 mb-2 capitalize"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;