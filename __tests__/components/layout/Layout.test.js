import { render } from '@testing-library/react';
import Layout from '../../../components/layout';

describe('Layout', () => {
  it('check the snapshot', () => {
    const { asFragment } = render(<Layout />);
    expect(asFragment()).toMatchSnapshot();
  });
});
