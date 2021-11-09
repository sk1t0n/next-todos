import { screen } from '@testing-library/react';
import { renderWithRedux } from '../../store/utils';
import { RenderResult } from '@testing-library/react/types';
import Home from '../../pages/index'

describe('Home', () => {
  it('check the snapshot', () => {
    const component = <Home />;
    const {asFragment} = renderWithRedux(component);
    expect(asFragment()).toMatchSnapshot();
  });
});
