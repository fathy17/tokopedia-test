import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Apollo GraphQL client.
const client = new ApolloClient({
  uri: `https://graphql-pokeapi.graphcdn.app/`,
  cache: new InMemoryCache(),
});

export default client;
