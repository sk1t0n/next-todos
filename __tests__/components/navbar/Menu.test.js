import { render } from '@testing-library/react';
import Menu from '../../../components/navbar/menu';

describe('Menu', () => {
  it('check the snapshot', async () => {
    const theme = 'dark';
    const mode = 'horizontal';
    const onClick = jest.fn();
    const selectedKeys = ['home'];
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
