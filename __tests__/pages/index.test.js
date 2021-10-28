import { render, screen } from '@testing-library/react';
import Home from '../../pages/index'

describe('Home', () => {
  it('check the snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the heading', () => {
    render(<Home />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
  });
});
