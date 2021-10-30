import { useRef, useState } from 'react';
import { Layout, Row, Col, Drawer } from 'antd';
import styles from '../../styles/Header.module.less';
import Menu from '../navbar/menu';
import Hamburger from '../navbar/hamburger';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrent as setCurrentMenuItem } from '../../store/menuSlice';

const Header = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const hamburgerRef = useRef();
  const showDrawer = () => setVisibleDrawer(true);
  const closeDrawer = () => {
    setVisibleDrawer(false);
    hamburgerRef.current.classList.toggle('close');
  };

  const dispatch = useDispatch();
  const currentMenuItem = useSelector(state => state.menu.current);
  const onClickMenu = item => {
    dispatch(setCurrentMenuItem({ current: item.key }));
  };

  const items = {
    leftMenu: [
      { key: 'home', text: 'Home', path: '/' },
      { key: 'about', text: 'About', path: '/about' }
    ],
    rightMenu: [
      { key: 'register', text: 'Register', path: '/register' },
      { key: 'signin', text: 'Sign In', path: '/sign-in' }
    ]
  };

  return (
    <Layout.Header className={styles.header}>
      <Row>
        <Col flex="100px" className={styles.logo}>
          <div>Todos</div>
        </Col>
        <Col flex="auto">
          <Row justify="space-between">
            <Col xs={0} sm={0} md={24}>
              <Menu
                theme="dark"
                mode="horizontal"
                onClick={onClickMenu}
                selectedKeys={[currentMenuItem]}
                items={items}
                needUpperCase={true}
              />
            </Col>
            <Col
              xs={{ span: 4, offset: 20 }}
              sm={{ span: 3, offset: 21 }}
              md={0}
            >
              <Hamburger onClick={showDrawer} ref={hamburgerRef} />
              <Drawer
                title="Navigation"
                placement="left"
                closable={false}
                visible={visibleDrawer}
                onClose={closeDrawer}
              >
                <Menu
                  theme="light"
                  mode="inline"
                  onClick={onClickMenu}
                  selectedKeys={[currentMenuItem]}
                  items={items}
                />
              </Drawer>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
