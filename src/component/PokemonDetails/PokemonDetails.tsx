import React, { memo } from 'react';
import { Typography, Grid, Chip, Divider, CircularProgress } from '@mui/material';

interface PokemonDetailsProps {
  abilities: string[];
  types: string[];
  evolution?: string | null;
  loading: boolean;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ abilities, types, evolution, loading }) => {
  return (
    <div>
      {/* Title for Pokemon Details */}
      <Typography variant="h5" gutterBottom>
        Pokémon Details
      </Typography>

      {/* Abilities Section */}
      <Typography variant="h6" gutterBottom>
        Abilities:
      </Typography>
      <Grid container spacing={1}>
        {abilities.length > 0 ? (
          abilities.map((ability, index) => (
            <Grid key={index}>
              <Chip label={ability} color="primary" />
            </Grid>
          ))
        ) : (
            loading ? (<Typography><CircularProgress /></Typography>) : (<Typography>No abilities available</Typography>)

        )}
      </Grid>

      <Divider sx={{ margin: '16px 0' }} />

      {/* Types Section */}
      <Typography variant="h6" gutterBottom>
        Types:
      </Typography>
      <Grid container spacing={1}>
        {types.length > 0 ? (
          types.map((type, index) => (
            <Grid key={index}>
              <Chip label={type} color="secondary" />
            </Grid>
          ))
        ) : (
          loading ? (<Typography><CircularProgress /></Typography>) : (<Typography>No types available</Typography>)
        )}
      </Grid>

      <Divider sx={{ margin: '16px 0' }} />

      {/* Evolution Section */}
      <Typography variant="h6" gutterBottom>
        Evolution:
      </Typography>
      {loading ? (<Typography><CircularProgress /></Typography>) : (<Typography>{evolution ? evolution : 'No evolution data available'}</Typography>)}
    </div>
  );
};

export default memo(PokemonDetails);