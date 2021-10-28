import { Row, Col } from 'antd';
import TodoList from '../components/todos/TodosList';

const Home = () => {


  return (
    <Row>
      <Col span="12" offset="6">
        <TodoList />
      </Col>
    </Row>
  );
};

export default Home;
