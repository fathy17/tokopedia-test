import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      nextOffset
      prevOffset
      message
      results {
        name
        image
        id
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
      weight
      message
      base_experience
      moves {
        move {
          name
          url
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;
