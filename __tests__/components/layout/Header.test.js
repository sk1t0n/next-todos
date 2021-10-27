import { render } from '@testing-library/react';
import Header from '../../../components/layout/header';

describe('Header', () => {
  it('check the snapshot', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
