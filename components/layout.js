import Header from '../components/header';
import Footer from '../components/footer';
import { Button } from 'antd';

const Layout = ({ children }) => (
  <>
    <Header />
    <main>{ children }</main>
    <Footer />
    <Button type="primary">click me</Button>
  </>
);

export default Layout;
