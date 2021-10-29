import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import menuReducer from './menuSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
    menu: menuReducer
  }
});
