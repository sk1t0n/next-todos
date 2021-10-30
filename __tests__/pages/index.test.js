import { screen } from '@testing-library/react';
import { renderWithRedux } from '../../store/utils';
import Home from '../../pages/index'

describe('Home', () => {
  it('check the snapshot', () => {
    const { asFragment } = renderWithRedux(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the heading', () => {
    renderWithRedux(<Home />);
    expect(screen.getByText(/task list/i)).toBeInTheDocument();
  });
});
