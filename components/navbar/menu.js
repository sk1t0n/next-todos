import Link from 'next/link';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

const _Menu = ({
  theme,
  mode,
  onClick,
  selectedKeys,
  items,
  needUpperCase = false
}) => {
  return (
    <Menu
      theme={theme}
      mode={mode}
      onClick={onClick}
      selectedKeys={selectedKeys}
    >
      {[...items.leftMenu].map(({ key, text, path }) => (
        <Menu.Item key={key}>
          <Link href={path}>
            <a>{needUpperCase ? text.toUpperCase() : text}</a>
          </Link>
        </Menu.Item>
      ))}
      {mode === 'inline' ? <Menu.Divider /> : null}
      {[...items.rightMenu].map(({ key, text, path }) => (
        <Menu.Item key={key}>
          <Link href={path}>
            <a>{needUpperCase ? text.toUpperCase() : text}</a>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

_Menu.propTypes = {
  theme: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.shape({
    leftMenu: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
      })
    ).isRequired,
    rightMenu: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  needUpperCase: PropTypes.bool
};

export default _Menu;
