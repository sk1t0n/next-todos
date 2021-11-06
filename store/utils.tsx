import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { RenderOptions } from '@testing-library/react/types';
import { EnhancedStore } from '@reduxjs/toolkit/dist/configureStore';
import { PreloadedState } from '@reduxjs/toolkit';
import { RootState, rootReducer } from './index';

type Config = {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore;
  renderOptions?: Omit<RenderOptions, 'queries'>;
};

export const renderWithRedux = (
  component: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
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
