import React, { useEffect } from 'react';
import Head from 'next/head';
import { Row, Col, Tabs, Spin, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../store/slices/todoSlice';
import { RootState } from '../store';
import TodoList from '../components/todos/TodosList';
import AddTodo from '../components/todos/AddTodo';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let callbackFail: (message: string) => void;
    callbackFail = (errorMessage) => message.error(errorMessage);
    dispatch(getTodos({ callbackFail }));
  }, [dispatch]);

  const isLoading = useSelector((state: RootState) => state.todos.isLoading);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Row>
        <Col
          lg={{ span: 12, offset: 6 }}
          md={{ span: 18, offset: 3 }}
          sm={{ span: 20, offset: 2 }}
          xs={{ span: 22, offset: 1 }}
        >
          {isLoading
            ? (
                <Spin
                  size="large"
                  style={{ display: 'flex', justifyContent: 'center', marginTop: '25vh' }}
                />
              )
            : (
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="Show task list" key="1">
                    <TodoList />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Add a task" key="2">
                    <AddTodo />
                  </Tabs.TabPane>
                </Tabs>
              )
          }
        </Col>
      </Row>
    </>
  );
};

export default Home;
