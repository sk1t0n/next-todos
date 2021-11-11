import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import menuReducer from './slices/menuSlice';
import userReducer from './slices/userSlice';

export const rootReducer = combineReducers({
  todos: todoReducer,
  menu: menuReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer
});
