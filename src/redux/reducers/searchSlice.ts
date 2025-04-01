import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string; // The search query
}

const initialState: SearchState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload; // Set the search query in the state
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;