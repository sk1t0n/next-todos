import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import menuReducer from './slices/menuSlice';

export const rootReducer = combineReducers({
  todos: todoReducer,
  menu: menuReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer
});
