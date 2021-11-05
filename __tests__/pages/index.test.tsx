import { screen } from '@testing-library/react';
import { renderWithRedux } from '../../store/utils';
import { RenderResult } from '@testing-library/react/types';
import Home from '../../pages/index'

describe('Home', () => {
  it('check the snapshot', () => {
    const component = <Home data={[]} />;
    const {asFragment} = renderWithRedux(component);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the heading', () => {
    const component = <Home data={[]} />;
    renderWithRedux(component);
    expect(screen.getByText(/task list/i)).toBeInTheDocument();
  });
});
