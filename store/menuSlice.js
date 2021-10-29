import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    current: 'home'
  },
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload.current;
    }
  }
});

export const { setCurrent } = menuSlice.actions;

export default menuSlice.reducer;
