import React, { useRef, useState } from 'react';
import { Layout, Row, Col, Drawer } from 'antd';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import styles from '../../styles/Header.module.less';
import Menu from '../navbar/menu';
import Hamburger from '../navbar/hamburger';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrent as setCurrentMenuItem } from '../../store/slices/menuSlice';
import { MenuItems } from '../navbar/menu';
import { MenuState } from '../../store/slices/menuSlice';
import { RootState } from '../../store';

const Header: React.FC = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const hamburgerRef = useRef<HTMLDivElement>();
  const showDrawerHandler = () => setVisibleDrawer(true);
  const closeDrawerHandler = () => {
    setVisibleDrawer(false);
    hamburgerRef.current.classList.toggle('close');
  };

  const dispatch = useDispatch();
  const currentMenuItem = useSelector((state: {menu: MenuState}) => (
    state.menu.current
  ));
  const menuHandler: MenuClickEventHandler = (item) => {
    dispatch(setCurrentMenuItem({ current: item.key }));
  };

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const items: MenuItems = {
    leftMenu: [
      { key: 'home', text: 'Home', path: '/' },
      { key: 'about', text: 'About', path: '/about' }
    ],
    rightMenu: !isLoggedIn ? [
      { key: 'register', text: 'Register', path: '/register' },
      { key: 'sign-in', text: 'Sign In', path: '/sign-in' }
    ] : [
      { key: 'sign-out', text: 'Sign Out', path: '/sign-out' }
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
                onClick={menuHandler}
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
              <Hamburger onClick={showDrawerHandler} ref={hamburgerRef} />
              <Drawer
                title="Navigation"
                placement="left"
                closable={false}
                visible={visibleDrawer}
                onClose={closeDrawerHandler}
              >
                <Menu
                  theme="light"
                  mode="inline"
                  onClick={menuHandler}
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
