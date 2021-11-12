import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from './slices/todoSlice';
import menuReducer from './slices/menuSlice';
import userReducer from './slices/userSlice';

export const rootReducer = combineReducers({
  todos: todoReducer,
  menu: menuReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store;
