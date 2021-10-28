import { Row, Col, Tabs } from 'antd';
import TodoList from '../components/todos/TodosList';

const Home = () => {
  const handleTabsChange = (e) => console.log(e);

  return (
    <Row>
      <Col
        lg={{ span: 12, offset: 6 }}
        md={{ span: 18, offset: 3 }}
        sm={{ span: 20, offset: 2 }}
        xs={{ span: 22, offset: 1 }}
      >
        <Tabs defaultActiveKey="1" onChange={handleTabsChange}>
          <Tabs.TabPane tab="Show todo list" key="1">
            <TodoList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Add todo" key="2">
            Add Todo
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Home;
