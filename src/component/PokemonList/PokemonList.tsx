import React, { useEffect, useState, useMemo, useDeferredValue, memo, useCallback } from 'react';
import { CircularProgress, List } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemons } from '../../redux/reducers/pokemonSlice';
import { setFavoritePokemons, addFavorite, removeFavorite } from '../../redux/reducers/favoritePokemonSlice';
import { getPokemons, getFavorites, addFavoritePokemonToMongo, removeFavoriteFromMongo } from '../../services/apiService';
import PokemonCard from '../PokemonCard/PokemonCard';
import { AppDispatch, RootState } from '../../redux/store'; // Types for the store

interface FavoritePokemon {
    name: string;
    _id: string;
  }

  interface Pokemon {
    name: string;
  }

const PokemonList: React.FC = () => {
  
    const dispatch = useDispatch<AppDispatch>();
    const { pokemons } = useSelector((state: RootState) => state.pokemon);
    const { favoritesPokemons } = useSelector((state: RootState) => state.favoritesPokemons);
    const { query } = useSelector((state: RootState) => state.search);
    const { filter } = useSelector((state: RootState) => state.filter);
    const { id } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);

const deferredSearchTerm = useDeferredValue(query);
const deferredFilter = useDeferredValue(filter);

  const filteredPokemonsByName = useMemo(() => {
    return pokemons.filter((pokemon: any) => pokemon.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()));
  }, [pokemons, deferredSearchTerm]);

  const favoritePokemonsNames = useMemo(() => {
    const favoritesObject = favoritesPokemons.reduce<Record<string, { id: string }>>((acc, pokemon: FavoritePokemon) => {
      acc[pokemon.name] = { id: pokemon._id };
      return acc;
    }, {});
    return favoritesObject;
  },[favoritesPokemons])

  const filteredPokemons = useMemo(() => {
    switch (deferredFilter) {
      case 'all':
        return filteredPokemonsByName;
      case 'favorites':
        return filteredPokemonsByName.filter((pokemon: any) => pokemon.name in favoritePokemonsNames);
      case 'non-favorites':
        return filteredPokemonsByName.filter((pokemon: any) => !(pokemon.name in favoritePokemonsNames));
      default:
        return filteredPokemonsByName;
    }
  }, [deferredFilter, filteredPokemonsByName, favoritePokemonsNames]);
  

  const fetchPokemons =  useCallback(async () => {
    setLoading(true);  
    const [pokemonsData, favoritePokemonsData] = await Promise.all([
      getPokemons(),
      getFavorites(id),
    ]);
    
    setLoading(false);
    dispatch(setPokemons(pokemonsData));
    dispatch(setFavoritePokemons(favoritePokemonsData));
  },[id, dispatch]);

  const addFavoritePokemon = useCallback(
    async (name: string) => {
        try {
          const fovoritePokemon = await addFavoritePokemonToMongo({ name, userId: id });
          dispatch(addFavorite(fovoritePokemon));
        } catch (error) {
            console.error("Error adding favorite", error);
        }

  },[id, dispatch])

  const removeFavoritePokemon = useCallback(async (favoriteId: string) => {
    
      await removeFavoriteFromMongo(favoriteId);
      
      dispatch(removeFavorite(favoriteId));
    
},[dispatch])
  
  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <List style={{alignItems:"center" }}>
      
      {filteredPokemons 
        .map((pokemon: Pokemon) => (
            
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            isFavoritePokemon={pokemon.name in favoritePokemonsNames}
            addFavorite={addFavoritePokemon}  
            removeFavorite={removeFavoritePokemon}
            favoriteId={favoritePokemonsNames[pokemon.name]?.id || ""}
          />))}
      {loading && <CircularProgress />}
    </List>
  );
};

export default memo(PokemonList);