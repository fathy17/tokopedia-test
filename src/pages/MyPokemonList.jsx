import React, { useState } from 'react';
import PokemonCard from '../components/PokemonCard';

export default function MyPokemonList() {
  const [toggleRerender, setToggleRerender] = useState(false);
  const value = JSON.parse(localStorage.getItem('myPokemonList'));

  if (!value?.length) {
    return (
      <p className="font-semibold text-center">You don't have any pokemon.</p>
    );
  }

  return (
    <div>
      {value.map((pokemon) => (
        <PokemonCard
          key={`${pokemon.id}-${pokemon.nickName}`}
          pokemon={pokemon}
          catched
          toggle={toggleRerender}
          rerender={setToggleRerender}
        />
      ))}
    </div>
  );
}
