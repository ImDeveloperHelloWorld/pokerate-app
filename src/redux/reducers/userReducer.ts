import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  id: string;
}

const initialState: userState = {
  id: '1',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    }
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;