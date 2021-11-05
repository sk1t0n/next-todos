import React from 'react';
import { Layout } from 'antd';
import styles from '../../styles/Footer.module.less';

const Footer: React.FC = () => (
  <Layout.Footer className={styles.footer}>
    Copyright &copy; { (new Date()).getFullYear() }
  </Layout.Footer>
);

export default Footer;
