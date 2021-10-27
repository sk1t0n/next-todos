import { render } from '@testing-library/react';
import Menu from '../../../components/navbar/menu';

describe('Menu', () => {
  it('check the snapshot', () => {
    const theme = 'dark';
    const mode = 'horizontal';
    const onClick = () => {};
    const items = {
      leftMenu: [
        { key: 'home', text: 'Home' },
        { key: 'about', text: 'About' }
      ],
      rightMenu: [
        { key: 'register', text: 'Register' },
        { key: 'signin', text: 'Sign In' }
      ]
    };
    const { asFragment } = render(<
      Menu theme={theme} mode={mode} onClick={onClick} items={items}  />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
