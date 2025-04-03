import axios from 'axios';

const apiUrl = process.env.REACT_APP_POKERATE_SERVER_URL;

export const getPokemons = async (offset: number) => {
    try {
        const response = await axios.get(`${apiUrl}/pokemons?offset=${offset}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching pokemons:', error);
        
    }
};

export const getPokemonByName = async (pokemonName: string) => {
    
    try {
            const response = await axios.get(`${apiUrl}/pokemons/${pokemonName}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching pokemon by name:', error);
            
        }
};

export const getPokemonEvolution = async (pokemonId: string) => {
    
    try {
            const response = await axios.get(`${apiUrl}/pokemons/evolution/${pokemonId}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching pokemon by id:', error);
            
        }
};

export const getFavorites = async (userId: string) => {

    try {
            const response = await axios.get(`${apiUrl}/favorites/${userId}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching favorites pokemons:', error);
            
        }
};

export const addFavoritePokemonToMongo = async (favoritePokemon: { name: string, userId: string }) => {

    try {
            const response = await axios.post(`${apiUrl}/favorites`, favoritePokemon);
            return response.data;
        }
        catch (error) {
            console.error('Error adding favorite to mongo', error);
            
        }
};

export const removeFavoriteFromMongo = async (favoriteId: string) => {

    try {
            const response = await axios.delete(`${apiUrl}/favorites/${favoriteId}`);
            return response.data;
        }
        catch (error) {
            console.error('Error removing favorite from mongo', error);
            
        }
};
