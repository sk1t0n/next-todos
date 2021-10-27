import { render } from '@testing-library/react';
import Hamburger from '../../../components/navbar/hamburger';

describe('Hamburger', () => {
  it('check the snapshot', () => {
    const { asFragment } = render(
      <Hamburger ref={null} onClick={(() => {})} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
