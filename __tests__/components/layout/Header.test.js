import { renderWithRedux } from '../../../store/utils';
import Header from '../../../components/layout/header';

describe('Header', () => {
  it('check the snapshot', () => {
    const { asFragment } = renderWithRedux(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
