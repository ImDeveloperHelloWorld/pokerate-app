import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritePokemon {
  name: string;
  _id: string;
}

interface FavoritePokemonState {
  favoritesPokemons: FavoritePokemon[];
}

const initialState: FavoritePokemonState = {
  favoritesPokemons: []
};

const favoritepokemonSlice = createSlice({
  name: 'favoritePokemon',
  initialState,
  reducers: {
    setFavoritePokemons: (state, action: PayloadAction<FavoritePokemon[]>) => {
      if(action.payload){
        state.favoritesPokemons = action.payload;
      }
    },
    addFavorite: (state, action: PayloadAction<FavoritePokemon>) => {
      state.favoritesPokemons.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoritesPokemons = state.favoritesPokemons.filter(pokemon => pokemon._id !== action.payload);
    },
  },
});

export const { setFavoritePokemons, addFavorite, removeFavorite } = favoritepokemonSlice.actions;




export default favoritepokemonSlice.reducer;