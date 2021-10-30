import { renderWithRedux } from '../../../store/utils';
import Layout from '../../../components/layout';

describe('Layout', () => {
  it('check the snapshot', () => {
    const { asFragment } = renderWithRedux(<Layout />);
    expect(asFragment()).toMatchSnapshot();
  });
});
