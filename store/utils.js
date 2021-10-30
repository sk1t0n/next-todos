import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import menuReducer from './menuSlice';
import todoReducer from './todoSlice';

export const renderWithRedux = (
  component,
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
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(component, { wrapper: Wrapper, ...renderOptions })
};
