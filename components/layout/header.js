import { useState, useRef } from 'react';
import { Layout, Row, Col, Drawer } from 'antd';
import styles from '../../styles/Header.module.less';
import Menu from '../navbar/menu';
import Hamburger from '../navbar/hamburger';

const Header = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const hamburgerRef = useRef();
  const showDrawer = () => setVisibleDrawer(true);
  const closeDrawer = () => {
    setVisibleDrawer(false);
    hamburgerRef.current.classList.toggle('close');
  };

  const [currentItemMenu, setCurrentItemMenu] = useState('home');
  const onClickMenu = item => setCurrentItemMenu(item.key);

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

  return (
    <Layout.Header className={styles.header}>
      <Row>
        <Col flex="100px" className={styles.logo}>
          <div>Todos</div>
        </Col>
        <Col flex="auto">
          <Row justify="space-between">
            <Col sm={0} md={24}>
              <Menu
                theme="dark"
                mode="horizontal"
                onClick={onClickMenu}
                selectedKeys={[currentItemMenu]}
                items={items}
                needUpperCase={true}
              />
            </Col>
            <Col sm={{ span: 3, offset: 21 }} md={0}>
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
                  selectedKeys={[currentItemMenu]}
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
