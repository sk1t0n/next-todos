import React from 'react';
import { Table, Checkbox, Button, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, removeTodo } from '../../store/slices/todoSlice';
import { Todo } from './types';
import { RootState } from '../../store';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const columns: ColumnsType<Todo> = [
    {
      title: 'Text',
      dataIndex: ['text'],
      sorter: (a, b) => a.text>b.text ? 1 : a.text<b.text ? -1 : 0,
      render: (...params) => {
        const text = params[0];
        const completed = params[1]['completed'];

        if (completed) {
          return (
            <span style={{ textDecoration: 'line-through' }}>{ text }</span>
          );
        }
        return <span>{ text }</span>;
      }
    },
    {
      title: 'Completed',
      dataIndex: ['completed'],
      render: (...params) => {
        const completed = params[0] as boolean;
        const id = params[1]['id'];
        let callbackFail: (message: string) => void;
        callbackFail = (errorMessage) => message.error(errorMessage);
        const arg = {
          id,
          completed: !completed,
          callbackSuccess: () => message.info('Task was successfully updated!'),
          callbackFail
        };

        return (
          <Checkbox
            style={{ display: 'flex', justifyContent: 'center' }}
            defaultChecked={completed}
            onChange={() => dispatch(updateTodo(arg))}
          />
        );
      },
      filters: [
        { text: 'Completed', value: true }
      ],
      onFilter: (value, item) => item.completed === value,
      sorter: (a, b) => a.completed>b.completed
        ?  1 : a.completed<b.completed
        ? -1 : 0
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id) => (
        <Button
          type="primary"
          danger
          block
          onClick={() => {
            dispatch(removeTodo({
              id,
              callbackSuccess: () => message.info('The task was successfully deleted!'),
              callbackFail: (errorMessage) => message.error(errorMessage)
            }));
          }}
        >
          Remove
        </Button>
      )
    },
  ];

  const dataSource = todos.map(todo => ({
    ...todo,
    key: String(todo.id)
  }));

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20']
      }}
    />
  );
};

export default TodoList;
