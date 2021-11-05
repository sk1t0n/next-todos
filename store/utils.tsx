import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { RenderOptions } from '@testing-library/react/types';
import { EnhancedStore } from '@reduxjs/toolkit/dist/configureStore';
import { PreloadedState, CombinedState } from 'redux';
import menuReducer from './slices/menuSlice';
import todoReducer from './slices/todoSlice';

type Config = {
  preloadedState?: PreloadedState<CombinedState<object>>;
  store?: EnhancedStore;
  renderOptions?: Omit<RenderOptions, 'queries'>;
};

export const renderWithRedux = (
  component: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        menu: menuReducer,
        todos: todoReducer
      },
      preloadedState
    }),
    ...renderOptions
  }: Config = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(component, { wrapper: Wrapper, ...renderOptions })
};
