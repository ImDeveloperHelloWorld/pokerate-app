import './App.css';
import { Container, CssBaseline, Box } from '@mui/material';
import SearchBar from '../src/component/SerachBar/SearchBar';
import PokemonList from '../src/component/PokemonList/PokemonList';
import  Filter from '../src/component/Filter/Filter';

function App() {
  return (
    <Container>
      <CssBaseline />
      <Box mt={2}>
        <SearchBar />
        <Filter />
        <PokemonList />
      </Box>
    </Container>
  );
}

export default App;