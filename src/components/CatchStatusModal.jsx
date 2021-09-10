import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function CatchStatusModal() {
  const value = JSON.parse(localStorage.getItem('myPokemonList'));

  const [nickName, setNickName] = useState('');
  const [error, setError] = useState('');

  const [open, setOpen, successCatch, setSuccessCatch, data, setData] =
    useContext(AppContext);

  const onChangeHandler = (e) => {
    setNickName(e.target.value);
  };

  const handleCatchPokemon = () => {
    const nickNameAvailable = value?.filter(
      (item) => item.nickName == nickName && item.id == data.id
    );
    if (!nickNameAvailable.length) {
      localStorage.setItem(
        'myPokemonList',
        JSON.stringify([...value, { ...data, nickName }])
      );
      setOpen(false);
    } else {
      setError('Nickname has been used. Choose another name!');
    }
  };

  if (open) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center">
        <div className="w-96 p-4 rounded-lg bg-white">
          {successCatch ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl font-semibold">
                Congrats! You have caught {data.name}.
              </p>
              <img className="w-32 my-4" src={data.image} alt="" />
              <label htmlFor="pokemon-nickname">Give nickname:</label>
              <div>
                <input
                  onChange={onChangeHandler}
                  id="pokemon-nickname"
                  placeholder="Nickname"
                  type="text"
                  className="border-2 border-yellow-500 rounded-lg px-2 mr-4"
                />
                <button
                  onClick={handleCatchPokemon}
                  className="bg-green-500 font-semibold px-4 rounded-lg py-1"
                >
                  Okay
                </button>
              </div>
              <small className="text-xs text-red-500 mt-2">{error}</small>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl font-semibold mb-4">
                <span className="capitalize">{data.name}</span> escape! {':('}
              </p>
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="bg-green-500 font-semibold px-4 rounded-lg py-1"
              >
                Okay
              </button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return '';
  }
}
