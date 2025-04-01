import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './reducers/pokemonSlice';
import searchReducer from './reducers/searchSlice';
import filterReducer from './reducers/filterSlice';
import favoritesPokemonsReducer from './reducers/favoritePokemonSlice';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
  pokemon: pokemonReducer,
  favoritesPokemons: favoritesPokemonsReducer,
  search: searchReducer,
  filter: filterReducer,
  user: userReducer,
}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export default store;