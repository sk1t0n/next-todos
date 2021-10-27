import { render, screen } from '@testing-library/react';
import { describe } from 'jest-circus';
import Footer from '../../../components/layout/footer';

describe('Footer', () => {
  it('check the snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should be the text with copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();
  });
});
