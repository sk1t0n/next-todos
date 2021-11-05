import { createSlice } from '@reduxjs/toolkit';

export type MenuState = {
  current: string;
}

const initialState: MenuState = {
  current: 'home',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload.current;
    }
  }
});

export const { setCurrent } = menuSlice.actions;

export default menuSlice.reducer;
