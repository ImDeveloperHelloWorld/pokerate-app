import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonState {
  pokemons: Pokemon[];
  favorites: Pokemon[];
}

const initialState: PokemonState = {
  pokemons: [],
  favorites: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      if(action.payload){
        state.pokemons = action.payload;
      }
    },
  },
});

export const { setPokemons } = pokemonSlice.actions;




export default pokemonSlice.reducer;