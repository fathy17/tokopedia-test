import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../graphql/queries';
import PokemonCard from '../components/PokemonCard';

export default function PokemonList() {
  const [offset, setOffset] = useState(1);
  const { loading, error, data, refetch } = useQuery(GET_POKEMONS, {
    fetchPolicy: 'no-cache',
    variables: { offset, limit: 10 },
  });

  const nextPokemonList = () => {
    setOffset(data.pokemons.nextOffset);
    refetch();
  };

  const prevPokemonList = () => {
    setOffset(data.pokemons.prevOffset);
    refetch();
  };

  if (loading) {
    return (
      <p className="w-full flex justify-center text-xl font-bold">loading...</p>
    );
  }
  if (error) {
    console.error(error);
    return (
      <p className="w-full flex justify-center text-xl font-bold">
        Something went wrong!
      </p>
    );
  }
  return (
    <div>
      {data?.pokemons?.results?.map((pokemon) => {
        return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
      })}
      <div className="flex justify-center">
        {data.pokemons.prevOffset ? (
          <button onClick={prevPokemonList}>prev</button>
        ) : (
          ''
        )}
        <p className="mx-4">
          {offset} - {data.pokemons.nextOffset}
        </p>
        <button onClick={nextPokemonList}>next</button>
      </div>
    </div>
  );
}
