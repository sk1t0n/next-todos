import React from 'react';
import Head from 'next/head';
import { Row, Col, Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { setTodos } from '../store/slices/todoSlice';
import TodoList from '../components/todos/TodosList';
import AddTodo from '../components/todos/AddTodo';
import { Todo } from '../components/todos/types';

type FetchTodo = Todo & {title: string};

type Props = {
  data: Array<FetchTodo>
};

export async function getStaticProps() {
  const url = 'https://jsonplaceholder.typicode.com/todos?_limit=30';
  const res = await fetch(url);
  const data = await res.json();

  if (Object.keys(data).length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data
    }
  };
}

const Home: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const todos = data.map(todo => {
    return {...todo, text: todo.title};
  });
  dispatch(setTodos({ todos }));

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
    </>
  );
};

export default Home;
