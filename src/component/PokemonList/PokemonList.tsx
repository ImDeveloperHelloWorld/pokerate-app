import React, { useEffect, useState, useMemo, useDeferredValue, memo, useCallback } from 'react';
import { CircularProgress, List } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemons } from '../../redux/reducers/pokemonSlice';
import { setFavoritePokemons, addFavorite, removeFavorite } from '../../redux/reducers/favoritePokemonSlice';
import { getPokemons, getFavorites, addFavoritePokemonToMongo, removeFavoriteFromMongo } from '../../services/apiService';
import PokemonCard from '../PokemonCard/PokemonCard';
import { AppDispatch, RootState } from '../../redux/store'; // Types for the store
import CustomAlert from '../CustomAlert/CustomAlert';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('success');
  const [alertOpen, setAlertOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true); // For checking if more data is available
  const [offset, setOffset] = useState(0);
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
  

  

  const fetchPokemons =  useCallback(async (offset: number) => {
    try{
      console.log("offset: ", offset);
      
      const pokemonsData = await getPokemons(offset);
      setHasMore(pokemonsData.length > 0)
      const updatedPokemons = [...pokemons, ...pokemonsData]; 
      console.log(updatedPokemons);
      
      dispatch(setPokemons(updatedPokemons));

  }catch(e){
    console.log(e);    
  }
  },[dispatch, pokemons]);

  const fetchFavoritePokemons = useCallback(async () => {
    try {
      const favoritePokemonsData = await getFavorites(id);
      dispatch(setFavoritePokemons(favoritePokemonsData)); 
      
    } catch (error) {
      console.log(error);
      
    }
  },[id, dispatch])

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchPokemons(0),
        fetchFavoritePokemons()
      ]);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      
    }

  },[fetchPokemons, fetchFavoritePokemons])

  const showAlert = useCallback((message: string, severity: 'error' | 'warning' | 'info' | 'success') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  },[]);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const addFavoritePokemon = useCallback(
    async (name: string) => {
        try {
          const fovoritePokemon = await addFavoritePokemonToMongo({ name, userId: id });
          dispatch(addFavorite(fovoritePokemon));
          showAlert(`${name} add to favorite`, "success");
        } catch (error) {
            console.error("Error adding favorite", error);
        }

  },[id, dispatch, showAlert])

  const removeFavoritePokemon = useCallback(async (favoriteId: string, name: string) => {
    
      await removeFavoriteFromMongo(favoriteId);
      
      dispatch(removeFavorite(favoriteId));
      showAlert(`${name} removed from favorite`, "success");

    
},[dispatch, showAlert])

const loadMorePokemons = () => {
  
  const newOffset = offset + 15;
  setOffset(newOffset);
  fetchPokemons(newOffset);
};

  useEffect(() => {
    fetchAll();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    {alertOpen && <CustomAlert
          message={alertMessage}
          severity={alertSeverity}
          open={alertOpen}
          onClose={handleAlertClose} />}

    <List style={{alignItems:"center" }}>
<InfiniteScroll
      dataLength={filteredPokemons.length} // Length of the current list of Pokémon
      next={loadMorePokemons} // Function to call when scrolling
      hasMore={hasMore} // Whether there is more data to load
      loader={<CircularProgress />} // Display while loading more data
      endMessage={<p style={{ textAlign: 'center' }}>No more Pokémons</p>} // Display when no more data is available
    >
      
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
    </InfiniteScroll>
    </List>
    </>

  );
};

export default memo(PokemonList);