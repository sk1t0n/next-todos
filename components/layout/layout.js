import { Layout } from 'antd';
import styles from '../../styles/Layout.module.less';
import Header from './header';
import Footer from './footer';

const { Content } = Layout;

const _Layout = ({ children }) => (
  <Layout className={styles.layout}>
    <Header />
    <Content>{ children }</Content>
    <Footer />
  </Layout>
);

export default _Layout;
