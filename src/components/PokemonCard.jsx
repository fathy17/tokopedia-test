import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function PokemonCard({ pokemon, catched, rerender, toggle }) {
  const value = JSON.parse(localStorage.getItem('myPokemonList'));

  const catchedPokemon = {
    name: pokemon.name,
    id: pokemon.id,
    image: pokemon.image,
  };

  const [open, setOpen, successCatch, setSuccessCatch, data, setData] =
    useContext(AppContext);

  const catchPokemon = () => {
    if (Math.random() < 0.5) {
      setSuccessCatch(true);
      setOpen(true);
      setData(catchedPokemon);
    } else {
      setSuccessCatch(false);
      setOpen(true);
      setData(catchedPokemon);
    }
  };

  const releasePokemon = () => {
    const filteredPokemon = value.filter(
      (item) => item.nickName != pokemon.nickName || item.id != pokemon.id
    );
    localStorage.setItem('myPokemonList', JSON.stringify(filteredPokemon));
    rerender(!toggle);
    // console.log(filteredPokemon);
    // console.log(pokemon);
  };

  return (
    <div className="grid grid-cols-2 items-center border-2 border-yellow-500 rounded-lg mb-4 px-4">
      <img src={pokemon.image} alt={pokemon.name} />
      <div>
        <h3 className="capitalize text-xl font-semibold mb-4">
          {pokemon.name} {catched ? `(${pokemon.nickName})` : ''}
        </h3>
        <div>
          <Link to={`/pokemon-detail/${pokemon.name}?image=${pokemon.image}`}>
            <button className="px-4 mr-4 rounded-full bg-blue-400 font-semibold">
              INFO
            </button>
          </Link>
          {catched ? (
            <button
              onClick={() => {
                releasePokemon();
              }}
              className="px-4 rounded-full bg-green-500 font-semibold text-white"
            >
              RELEASE
            </button>
          ) : (
            <button
              onClick={() => {
                catchPokemon();
              }}
              className="px-4 rounded-full bg-red-500 font-semibold text-white"
            >
              CATCH!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
