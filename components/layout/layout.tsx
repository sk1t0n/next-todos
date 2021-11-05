import React from 'react';
import { Layout } from 'antd';
import stylesLayout from '../../styles/Layout.module.less';
import stylesContent from '../../styles/Content.module.less';
import Header from './header';
import Footer from './footer';

const { Content } = Layout;

const _Layout: React.FC = ({ children }) => (
  <Layout className={stylesLayout.layout}>
    <Header />
    <Content className={stylesContent.content}>{ children }</Content>
    <Footer />
  </Layout>
);

export default _Layout;
