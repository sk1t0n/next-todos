import { Row, Col, Tabs } from 'antd';
import TodoList from '../components/todos/TodosList';
import AddTodo from '../components/todos/AddTodo';

const Home = () => {
  return (
    <Row>
      <Col
        lg={{ span: 12, offset: 6 }}
        md={{ span: 18, offset: 3 }}
        sm={{ span: 20, offset: 2 }}
        xs={{ span: 22, offset: 1 }}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Show task list" key="1">
            <TodoList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Add a task" key="2">
            <AddTodo />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Home;
