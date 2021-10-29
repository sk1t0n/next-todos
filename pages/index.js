import { useState } from 'react';
import { Row, Col, Tabs, message } from 'antd';
import TodoList from '../components/todos/TodosList';
import AddTodo from '../components/todos/AddTodo';

const Home = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Todo 1', completed: true },
    { id: 2, text: 'Todo 2', completed: false },
    { id: 3, text: 'Todo 3', completed: true },
    { id: 4, text: 'Todo 4', completed: true },
    { id: 5, text: 'Todo 5', completed: false },
    { id: 6, text: 'Todo 6', completed: false },
    { id: 7, text: 'Todo 7', completed: true },
    { id: 8, text: 'Todo 8', completed: false },
    { id: 9, text: 'Todo 9', completed: true },
    { id: 10, text: 'Todo 10', completed: true },
    { id: 11, text: 'Todo 11', completed: false },
    { id: 12, text: 'Todo 12', completed: false },
    { id: 13, text: 'Todo 13', completed: true },
    { id: 14, text: 'Todo 14', completed: false },
    { id: 15, text: 'Todo 15', completed: true },
  ]);

  const addTodo = todo => {
    setTodos(todos => [...todos, todo]);
    message.info('Task was successfully added!');
  };

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
    message.info('The task was successfully deleted!');
  }

  const updateTodo = id => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        completed: !todo.completed
      };
    }));
    message.info('The task was successfully updated!');
  };

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
            <TodoList
              todos={todos}
              onRemoveTodo={removeTodo}
              onChangeTodo={updateTodo}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Add a task" key="2">
            <AddTodo onChangeTodos={addTodo} />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Home;
