import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import client from './ApolloClient';
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';
import MyPokemonList from './pages/MyPokemonList';
import PokemonDetail from './pages/PokemonDetail';
import PokemonList from './pages/PokemonList';

export default function App() {
  if (!JSON.parse(localStorage.getItem('myPokemonList'))) {
    localStorage.setItem('myPokemonList', JSON.stringify([]));
  }
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Router>
          <Layout>
            <Switch>
              <Route path="/my-pokemon-list">
                <MyPokemonList />
              </Route>
              <Route path="/pokemon-detail/:id">
                <PokemonDetail />
              </Route>
              <Route path="/">
                <PokemonList />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </AppProvider>
    </ApolloProvider>
  );
}
