import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import menuReducer from './slices/menuSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
    menu: menuReducer
  }
});
