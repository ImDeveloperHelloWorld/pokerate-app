import React, { useState, memo, useCallback } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import './PokemonCard.css';
import { getPokemonByName, getPokemonEvolution } from '../../services/apiService';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

interface PokemonCardProps {
  name: string;
  isFavoritePokemon: boolean;
  favoriteId: string;
  addFavorite: (name: string) => void;
  removeFavorite: (favoriteId: string, name: string) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, isFavoritePokemon, favoriteId, addFavorite, removeFavorite }) => {

  const [expanded, setExpanded] = useState<string | false>(false);
  const [isFavorite, setIsFavorite] = useState(isFavoritePokemon);
  const [disabled, setDisabled] = useState(false);
  const [abilities, setAbilities] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [evolution, setEvolution] = useState<string | null>(null);
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

const getPokemonDetails = useCallback(async (name: string) => {
  return await getPokemonByName(name);
},[]);

const handleChange =  useCallback((panel: string) => async (event: React.SyntheticEvent, isExpanded: boolean) => { 

  setExpanded(isExpanded ? panel : false);    

  if(pokemonData == null) {

  setLoading(true);

  const pokemonData = await getPokemonDetails(name);
  const pokemonEvolution = await getPokemonEvolution(pokemonData.id);
  
  setLoading(false);
  setAbilities(pokemonData.abilities.map((ability: any) => ability.ability.name));
  setTypes(pokemonData.types.map((type: any) => type.type.name));
  pokemonEvolution?.chain?.evolves_to?.length > 0 ? setEvolution(pokemonEvolution.chain.evolves_to[0].species.name) : setEvolution(null);
  setPokemonData(pokemonData);
  }
},[pokemonData, getPokemonDetails, name]);

const onFavoriteToggle = useCallback(async (event: React.MouseEvent) => {
    event.stopPropagation();
    setDisabled(true);
    !isFavorite ? addFavorite(name) : removeFavorite(favoriteId, name);
    setDisabled(false);
    setIsFavorite(!isFavorite);
},[addFavorite, favoriteId, name, removeFavorite, isFavorite])

  return (
    <Accordion expanded={expanded === name} onChange={handleChange(name)} className="pokemon-card">
      <div style={{display: 'flex', alignItems: 'center'}}>
      <div>
      <IconButton onClick={onFavoriteToggle} disabled={disabled}>
          {isFavorite ? <Star /> : <StarBorder />}
        </IconButton>
        </div>
        <div style={{width: '100%'}}>
      <AccordionSummary>
        <Typography sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>{name}</Typography>
      </AccordionSummary>
      </div>
      </div>
      <AccordionDetails>
        <PokemonDetails abilities={abilities} types={types} evolution={evolution} loading={loading}/>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(PokemonCard);