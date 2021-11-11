import { render } from '@testing-library/react';
import Menu from '../../../components/navbar/menu';
import { MenuItems } from '../../../components/navbar/menu'; 

describe('Menu', () => {
  it('check the snapshot', async () => {
    const theme = 'dark';
    const mode = 'horizontal';
    const onClick = jest.fn();
    const selectedKeys = ['home'];
    const items: MenuItems = {
      leftMenu: [
        { key: 'home', text: 'Home', path: '/' },
        { key: 'about', text: 'About', path: '/about' }
      ],
      rightMenu: [
        { key: 'register', text: 'Register', path: '/register' },
        { key: 'sign-in', text: 'Sign In', path: '/sign-in' }
      ]
    };
    const { asFragment } = render(
      <Menu
        theme={theme}
        mode={mode}
        onClick={onClick}
        selectedKeys={selectedKeys}
        items={items}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
