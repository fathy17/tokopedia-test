import React from 'react';
import { Link } from 'react-router-dom';
import CatchStatusModal from './CatchStatusModal';

export default function Layout({ children }) {
  return (
    <main className="max-w-5xl mx-auto">
      <nav className="bg-yellow-500 p-4 fixed top-0 left-0 w-full ">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/">
            <img
              className="w-16"
              src="https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png"
              alt="pokemon-logo"
            />
          </Link>
          <Link to="/my-pokemon-list">
            <img
              className="w-10"
              src="https://www.pinclipart.com/picdir/big/318-3180390_pokemon-newbies-pokedex-png-clipart.png"
              alt="pokedex"
            />
          </Link>
        </div>
      </nav>
      <section className="p-4 mt-16">{children}</section>
      <CatchStatusModal />
    </main>
  );
}
