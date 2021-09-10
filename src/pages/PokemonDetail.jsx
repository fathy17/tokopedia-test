import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router';
import { AppContext } from '../context/AppContext';
import { GET_POKEMON_DETAIL } from '../graphql/queries';

export default function PokemonDetail() {
  const query = new URLSearchParams(useLocation().search);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: id },
  });

  const [open, setOpen, successCatch, setSuccessCatch, _, setData] =
    useContext(AppContext);

  const catchPokemon = () => {
    if (Math.random() < 0.5) {
      setSuccessCatch(true);
      setOpen(true);
      setData({
        name: data.pokemon.name,
        id: data.pokemon.id,
        image: query.get('image'),
      });
    } else {
      setSuccessCatch(false);
      setOpen(true);
      setData({
        name: data.pokemon.name,
        id: data.pokemon.id,
        image: query.get('image'),
      });
    }
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
    <section className="flex flex-col items-center">
      <img className="w-56" src={query.get('image')} alt={data.pokemon.name} />
      <button
        onClick={catchPokemon}
        className="px-4 rounded-full bg-red-500 font-semibold text-white my-4"
      >
        CATCH!
      </button>
      <h3 className="uppercase font-bold text-4xl border-b-2 border-yellow-500">
        {data.pokemon.name}
      </h3>
      <p>
        exp :{' '}
        <span className="font-semibold">{data.pokemon.base_experience}</span>
      </p>
      <div className="w-full my-4 grid grid-cols-2 text-center">
        <p>Height: {data.pokemon.height}ft</p>
        <p>Weight: {data.pokemon.weight}kg</p>
        <div className=" my-4 col-span-2 flex justify-center">
          <p className="font-bold border-b-2 border-yellow-500">TYPES</p>
        </div>
        {data.pokemon.types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))}
        <div className=" my-4 col-span-2 flex justify-center">
          <p className="font-bold border-b-2 border-yellow-500">
            MOVES ({data.pokemon.moves.length})
          </p>
        </div>
        {data.pokemon.moves.map((move, index) => (
          <p key={index}>{move.move.name}</p>
        ))}
      </div>
    </section>
  );
}
